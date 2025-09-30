import { TranscriptionResponse, TranscriptionError } from '@/types/api';

const API_BASE_URL = 'http://localhost:8081';

export class ApiService {
  static async transcribeAudio(
    file: File,
    language: string = 'en',
    detailed: boolean = false
  ): Promise<TranscriptionResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    const endpoint = detailed ? '/transcribe_with_timestamps' : '/transcribe';

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error: TranscriptionError = await response.json();
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('API server is not healthy');
    }
    return response.json();
  }
}
