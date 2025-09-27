# YOLO Inference Server

A simple Python server for YOLO object detection inference. This server receives base64-encoded images and returns detection results.

## Features

- **YOLOv8 Integration**: Uses Ultralytics YOLOv8 nano model
- **FastAPI Backend**: High-performance async API server
- **Base64 Input/Output**: Receives and processes base64-encoded images
- **Simple Interface**: Single endpoint for object detection

## Installation

1. **Install dependencies**:
```bash
pip install -r requirements.txt
```

## Usage

### Start the server:

```bash
python app.py
```

Or with uvicorn directly:
```bash
uvicorn app:app --host 0.0.0.0 --port 3002 --reload
```

### API Endpoint

#### POST /detect

**Request Body:**
```json
{
  "image": "base64_encoded_image_data",
  "confidence": 0.5
}
```

- `image` accepts raw base64 strings and `data:*;base64,` URIs.
- `confidence` is optional; if omitted the server defaults to `0.25`.

**Response:**
```json
{
  "detections": [
    {
      "class": "person",
      "score": 87.5,
      "bbox": {
        "x": 450,
        "y": 200,
        "width": 180,
        "height": 320
      }
    }
  ],
  "inferenceTime": 45.2,
  "detectionsCount": 1,
  "confidence": 0.5
}
```

### Example Usage

```python
import requests
import base64

# Encode image to base64
with open('image.jpg', 'rb') as f:
    image_data = base64.b64encode(f.read()).decode('utf-8')

# Send detection request
response = requests.post('http://localhost:3002/detect', json={
    'image': image_data,
    'confidence': 0.5
})

result = response.json()
print(f"Detected {result['detectionsCount']} objects")
```

## Integration with Node.js

This server is designed to work with your existing Node.js video analysis server. Your Node.js app handles all image processing (decoding, resizing, etc.) and sends base64-encoded images to this Python server for inference.

## Project Structure

```
python-inference-server/
├── app.py                 # Main FastAPI server
├── requirements.txt       # Python dependencies
├── models/                # YOLO model files
│   └── yolov8n.pt
└── README.md             # Documentation
```

## License

ISC