from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from ultralytics import YOLO
import base64
import binascii
import cv2
import numpy as np
import time

# Inizializza app e modello
app = FastAPI()

# Load YOLO model
model = YOLO("models/yolo11n.pt")  # usa YOLOv8 nano per velocità

DEFAULT_CONFIDENCE = 0.25

class ImageData(BaseModel):
    image: str  # immagine in base64
    confidence: float | None = Field(default=None, ge=0.0, le=1.0)

def _strip_base64_header(image_base64: str) -> str:
    if "," in image_base64:
        return image_base64.split(",", 1)[1]
    return image_base64

def decode_image(image_base64: str):
    try:
        clean_base64 = _strip_base64_header(image_base64)
        nparr = np.frombuffer(base64.b64decode(clean_base64, validate=True), np.uint8)
    except (binascii.Error, ValueError) as exc:
        raise HTTPException(status_code=400, detail="Invalid base64 image data") from exc

    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if image is None:
        raise HTTPException(status_code=400, detail="Unable to decode image")

    return image

@app.post("/detect")
async def detect(data: ImageData):
    image = decode_image(data.image)

    confidence = data.confidence if data.confidence is not None else DEFAULT_CONFIDENCE

    start_time = time.perf_counter()
    results = model.predict(image, conf=confidence, verbose=False)
    inference_time_ms = round((time.perf_counter() - start_time) * 1000, 2)

    detections = []
    if results and results[0].boxes is not None:
        for box in results[0].boxes:
            x1, y1, x2, y2 = box.xyxy[0].tolist()
            class_index = int(box.cls[0])
            label = model.names.get(class_index) if hasattr(model, "names") else None
            detections.append({
                "bbox": {
                    "x": int(x1),
                    "y": int(y1),
                    "width": int(x2 - x1),
                    "height": int(y2 - y1)
                },
                "class": label if label is not None else str(class_index),
                "score": round(float(box.conf[0]) * 100, 2)
            })

    return {
        "detections": detections,
        "detectionsCount": len(detections),
        "inferenceTime": inference_time_ms,
        "confidence": confidence
    }