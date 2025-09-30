export interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
}

export interface WordSegment {
  word: string;
  start: number;
  end: number;
  score?: number;
}

export interface TranscriptionResponse {
  filename: string;
  language: string;
  segments: TranscriptionSegment[];
  text: string;
  word_segments?: WordSegment[];
}

export interface TranscriptionError {
  detail: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
