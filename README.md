# 🏠🔒 Home Security System

<div align="center">

![Home Security](https://img.shields.io/badge/Home-Security-blue?style=for-the-badge&logo=home-assistant)
![Nuxt 3](https://img.shields.io/badge/Nuxt-3.17.6-00DC82?style=flat-square&logo=nuxt.js)
![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=flat-square&logo=python)
![YOLO](https://img.shields.io/badge/YOLO-11n-FF6B35?style=flat-square&logo=yolo)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

</div>

---

## 🎯 What is Home Security System?

Home Security System is an intelligent **home monitoring solution** designed for residential and small business security. Using cutting-edge **computer vision** and **real-time analytics**, it automatically detects objects and people in video streams and provides comprehensive security insights through a beautiful web dashboard.

### 🌟 Key Highlights

- 🤖 **AI-Powered Detection**: Uses YOLO11n for accurate object and person detection
- 📹 **Real-Time Streaming**: Live video monitoring with multiple camera support
- 📊 **Event Logging**: Automatic logging of security events with images and timestamps
- 🎨 **Modern Dashboard**: Sleek Nuxt 3 interface with interactive monitoring
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🔄 **WebSocket Updates**: Real-time notifications and live data refresh
- 📈 **Security Analytics**: Historical events, logs, and detection insights
- 🛡️ **Privacy-Focused**: Local processing with no cloud dependencies

---

## 📸 Screenshots

<div align="center">

### 📱 Dashboard Screenshot
![Dashboard Screenshot](docs/images/streams-screenshot.png.png)

### 📹 Streams Management
![Streams Screenshot](docs/images/streams-screenshot.png.png)

### 🤖 Object Recognition
![Object Recognition Screenshot](docs/images/object-recognition-screenshot.png.png)

### 📊 Events Overview
![Events Screenshot](docs/images/events-screenshot.png)

### 📝 Logs View
![Logs Screenshot](docs/images/logs-screenshot.png.png)

</div>

---

## 🏗️ Architecture

Home Security System consists of four main components:

### 📹 Video Streams
- Camera feeds for real-time video monitoring
- Support for RTSP streams and local webcams

### 🐍 Inference Server (Python)
- AI service using YOLO11n for object detection
- Processes video frames and returns detection data

### 🗄️ Backend (Node.js)
- API server for managing streams, events, and logs
- Handles WebSocket connections for real-time updates

### 🎨 Dashboard (Nuxt 3)
- Full-stack Vue.js web application
- Real-time monitoring and security interface

### 🔄 Data Flow

1. **📹 Stream Capture**: Video feeds from cameras or RTSP sources
2. **🔍 Frame Processing**: Backend processes video frames from streams
3. **🤖 AI Detection**: Frames sent to Python inference server for object detection
4. **💾 Event Storage**: Detection events stored with images and timestamps
5. **📊 Visualization**: Real-time dashboard displays streams, events, and logs

---

## 🛠️ Tech Stack

### 🎨 Frontend (Dashboard)
- **Nuxt 3** - Full-stack Vue.js framework
- **Vue 3** - Progressive JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **FontAwesome** - Icon library

### 🐍 Backend (Inference)
- **Python** - AI inference server
- **Ultralytics YOLO** - State-of-the-art object detection
- **OpenCV** - Computer vision library

### 🗄️ Backend (API)
- **Node.js** - API server for data management
- **Express.js** - Web framework for Node.js

### 🔧 Infrastructure
- **PM2** - Process manager for Node.js/Python apps
- **WebSockets** - Real-time communication

---

## 📋 Features

### 🎯 Core Functionality
- ✅ **Real-time Video Monitoring** - Live streams from multiple cameras
- ✅ **Automated Object Detection** - AI-powered detection of people and objects
- ✅ **Event Logging** - Automatic recording of security events with images
- ✅ **Stream Management** - Add, configure, and manage video streams
- ✅ **Configurable Detection** - Adjustable confidence thresholds

### 📊 Analytics & Insights
- 📈 **Event History** - Time-series view of security events
- 📊 **Detection Statistics** - Object counts and detection metrics
- 📋 **Security Logs** - Comprehensive logging of system activities
- ⏱️ **Real-time Alerts** - Instant notifications via WebSocket

### 🎨 User Experience
- 🌙 **Responsive Design** - Optimized for all screen sizes
- 🎭 **Smooth Animations** - AOS (Animate On Scroll) integration
- 🎨 **Modern UI** - Clean, professional interface
- 📱 **Mobile Friendly** - Touch-optimized controls
- 🔄 **Real-time Updates** - Live data refresh and notifications

---

## 🚀 Quick Start

### 📋 Prerequisites

- 🐍 **Python 3.12+**
- 🟢 **Node.js 18+**
- 📹 **Camera or RTSP Stream**

### 🎯 Usage

### Start the Inference Server
```bash
cd python-inference-server
python app.py
```

### Start the Backend
```bash
cd video-analysis
npm start
```

### Start the Frontend
```bash
cd user-dashboard
npm run dev
```

Open your browser and go to `http://localhost:3000` to access the dashboard! 🎉

### Adding a Stream
1. Go to the Streams page in the dashboard.
2. Click "Add Stream" ➕
3. Enter your camera's RTSP URL or use a local webcam.
4. Start monitoring! 👀

---

##  License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- 🎯 **Ultralytics** for the amazing YOLO implementation
- 🎨 **Nuxt Team** for the fantastic framework
- 🤖 **OpenCV** for computer vision capabilities
- ❤️ **Built with love using Nuxt 3, Node.js, and Python**