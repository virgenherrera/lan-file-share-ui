import { UploadResponse } from './upload-response.model';

export class FilesResponse {
  errorCount: number;
  errors: Record<string, string> = {};
  successCount: number;
  successes: Record<string, UploadResponse> = {};

  constructor(args: any) {
    this.errorCount = Object.keys(args.errors).length;
    this.errors = args.errors;
    this.successCount = Object.keys(args.successes).length;
    this.successes = args.successes;
  }
}
