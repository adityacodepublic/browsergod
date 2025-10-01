# WhisperX Timestamping API

A complete audio transcription system with Python FastAPI backend and Next.js frontend.

## Architecture

This project consists of two separate components:

- **Backend**: Python FastAPI server (port 8081)
- **Frontend**: Next.js web application (port 3001)

## Backend Setup (Python FastAPI)

### Prerequisites

- Python 3.8+
- UV package manager (recommended)

### Installation

1. Navigate to the server directory:

```bash
cd server
```

2. Create and activate a virtual environment:

```bash
# Windows PowerShell
uv venv
.venv\Scripts\activate

# in server dir
.venv\Scripts\activate
.\.venv\Scripts\Activate.ps1

# Linux/macOS (bash/zsh)
uv venv
source .venv/bin/activate
```

3. Install dependencies:

```bash

```

### Running the Server

#### Option 1: Using the run script

```bash
python run_server.py
```

#### Option 2: Direct execution

```bash
python app.py
```

#### Option 3: Using uvicorn directly

```bash
uvicorn app:app --host 0.0.0.0 --port 8081 --reload
```

The API server will be available at:

- **Local**: http://localhost:8081
- **API Docs**: http://localhost:8081/docs
- **Health Check**: http://localhost:8081/health

## Frontend Setup (Next.js)

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Navigate to the web directory:

```bash
cd web
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

### Development

```bash
# Start development server on port 3001
npm run dev
# or
pnpm dev
```

The web interface will be available at:

- **Local**: http://localhost:3001

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Server Configuration

The server runs on port 8081 as a minimal FastAPI application. It's designed to be extended with custom endpoints as needed.

## Features

### Backend Features

- **Minimal Setup**: Basic FastAPI server with logging
- **Extensible**: Ready to add custom endpoints and functionality
- **Production Ready**: Includes proper logging and error handling

### Frontend Features

- **Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **Drag & Drop**: Intuitive file upload with drag-and-drop support
- **Real-time Progress**: Visual feedback during transcription
- **Two Modes**: Basic and detailed transcription options
- **Mobile Friendly**: Responsive design that works on all devices
- **TypeScript**: Full type safety and better developer experience

## Note on API Integration

The backend server is now a minimal FastAPI application without any pre-configured functionality. To add API endpoints, you can extend the `server/app.py` file by adding FastAPI route handlers as needed. You can integrate any libraries or services you require in your custom endpoints.

## Project Structure

```
browsergod/
├── server/              # Python FastAPI backend
│   ├── app.py          # Main API application
│   ├── requirements.txt # Python dependencies
│   ├── run_server.py   # Server runner script
│   └── README.md       # Backend documentation
└── web/                # Next.js frontend
    ├── src/
    │   ├── app/        # Next.js app router
    │   ├── lib/        # Utilities and API services
    │   └── types/      # TypeScript definitions
    ├── package.json    # Node.js dependencies
    └── README.md       # Frontend documentation
```

## Getting Started

1. **Start the Backend**:

   ```bash
   cd server
   python run_server.py
   ```

2. **Start the Frontend** (in a new terminal):

   ```bash
   cd web
   npm run dev
   ```

3. **Open your browser**:
   - Backend API: http://localhost:8081/docs
   - Web Interface: http://localhost:3001

## Development Workflow

1. Make sure both backend and frontend are running
2. Upload audio files through the web interface
3. The frontend will send requests to the backend API
4. View transcription results with timestamps in real-time

## Troubleshooting

### Backend Issues

- Check if the WhisperX model loads correctly on startup
- Verify all Python dependencies are installed
- If you see "Package fastapi is not installed", activate the venv and reinstall: `.venv\Scripts\activate` then `uv pip install -r server/requirements.txt`
- Check the server logs for detailed error messages

### Frontend Issues

- Ensure Node.js dependencies are installed
- Check browser console for JavaScript errors
- Verify the backend API is accessible from the frontend

### Port Conflicts

- Backend uses port 8081
- Frontend uses port 3001
- Change ports in the respective configuration files if needed

## Contributing

1. Backend changes: Modify `server/app.py`
2. Frontend changes: Modify files in `web/src/`
3. Test changes with both components running
4. Update documentation as needed
