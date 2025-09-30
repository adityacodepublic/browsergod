# WhisperX Timestamping API - Web Interface

A modern Next.js web interface for the WhisperX audio transcription API with detailed timestamp support.

## Features

- 🎵 **Audio File Upload**: Drag & drop or click to select audio files (MP3, WAV, FLAC, M4A, OGG)
- 🌍 **Multi-language Support**: Support for 10+ languages including English, Spanish, French, German, etc.
- ⏱️ **Two Transcription Modes**:
  - Basic: Standard transcription with segment timestamps
  - Detailed: Word-level timestamps with alignment
- 🎨 **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- ⚡ **Real-time Progress**: Visual progress indicator during transcription
- 📱 **Mobile Friendly**: Responsive design that works on all devices

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Python backend running on port 8081 (see server setup)

### Installation

```bash
# Install dependencies
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

Open [http://localhost:3001](http://localhost:3001) to see the interface.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## API Integration

The frontend communicates with the FastAPI backend running on `http://localhost:8081`. Make sure the Python server is running before starting the web interface.

### API Endpoints Used

- `POST /transcribe` - Basic transcription
- `POST /transcribe_with_timestamps` - Detailed transcription with word-level timestamps
- `GET /health` - Health check

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page component
├── lib/                # Utilities and services
│   ├── api.ts         # API service layer
│   └── utils.ts       # Helper functions
└── types/              # TypeScript type definitions
    └── api.ts         # API response types
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React (built-in emojis)
- **API**: Fetch API with TypeScript

## Customization

### Styling
The interface uses Tailwind CSS classes. Modify the component styles in `src/app/page.tsx` or add custom styles to `src/app/globals.css`.

### API Configuration
Update the API base URL in `src/lib/api.ts` if your backend runs on a different port or host.

### Language Support
Add new languages by updating the language select options in `src/app/page.tsx` and ensuring your WhisperX model supports them.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the WhisperX Timestamping API system.
