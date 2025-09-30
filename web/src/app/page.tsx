'use client';

import { useState, useRef, useCallback } from 'react';
import { ApiService } from '@/lib/api';
import { TranscriptionResponse } from '@/types/api';
import { formatFileSize, formatTime } from '@/lib/utils';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState<'basic' | 'detailed'>('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<TranscriptionResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setError('');
    setResult(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const droppedFile = files[0];
      if (droppedFile.type.startsWith('audio/')) {
        handleFileSelect(droppedFile);
      } else {
        setError('Please select a valid audio file');
      }
    }
  }, [handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  }, [handleFileSelect]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleTranscribe = useCallback(async () => {
    if (!file) {
      setError('Please select an audio file first');
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setError('');
    setResult(null);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await ApiService.transcribeAudio(file, language, mode === 'detailed');

      clearInterval(progressInterval);
      setProgress(100);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during transcription');
    } finally {
      setIsLoading(false);
    }
  }, [file, language, mode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎵 WhisperX Timestamping API
          </h1>
          <p className="text-lg text-gray-600">
            Upload audio files and get precise transcriptions with timestamps
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* File Upload Area */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
              ${isDragOver
                ? 'border-blue-500 bg-blue-50'
                : file
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {file ? (
              <div>
                <div className="text-green-600 text-lg font-medium">
                  ✓ {file.name}
                </div>
                <div className="text-gray-500 text-sm">
                  {formatFileSize(file.size)}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-gray-500 text-lg mb-2">
                  Drag & drop an audio file here or click to select
                </div>
                <div className="text-gray-400">
                  Supported formats: MP3, WAV, FLAC, M4A, OGG
                </div>
              </div>
            )}
          </div>

          {/* Language Selection */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
              <option value="hi">Hindi</option>
            </select>
          </div>

          {/* Mode Selection */}
          <div className="mt-4 flex gap-4 justify-center">
            <button
              onClick={() => setMode('basic')}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all
                ${mode === 'basic'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              Basic Transcription
            </button>
            <button
              onClick={() => setMode('detailed')}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all
                ${mode === 'detailed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              Detailed Timestamps
            </button>
          </div>

          {/* Upload Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleTranscribe}
              disabled={!file || isLoading}
              className={`
                px-8 py-3 rounded-lg font-medium text-lg transition-all
                ${!file || isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }
              `}
            >
              {isLoading ? 'Transcribing...' : 'Transcribe Audio'}
            </button>
          </div>

          {/* Progress Bar */}
          {isLoading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-gray-600 mt-2">
                Processing... {progress}%
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Transcription Results</h3>

            {/* Full Text */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Full Text:</h4>
              <div className="p-4 bg-gray-50 rounded-lg italic">
                "{result.text}"
              </div>
            </div>

            {/* Segments */}
            {result.segments && result.segments.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Segments:</h4>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {result.segments.map((segment, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                      <div className="text-red-600 font-mono text-sm font-bold">
                        {formatTime(segment.start)} - {formatTime(segment.end)}
                      </div>
                      <div className="mt-1">{segment.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Word-level Timestamps */}
            {result.word_segments && result.word_segments.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Word-level Timestamps:</h4>
                <div className="p-4 bg-gray-50 rounded-lg leading-relaxed">
                  {result.word_segments.map((word, index) => (
                    <span
                      key={index}
                      className="inline-block mr-1 px-2 py-1 bg-blue-100 rounded cursor-help transition-colors hover:bg-blue-200"
                      title={formatTime(word.start)}
                    >
                      {word.word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>
            Powered by WhisperX & FastAPI |{' '}
            <a
              href="http://localhost:8081/docs"
          target="_blank"
          rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              API Documentation
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
