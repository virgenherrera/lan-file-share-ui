export class UploadResponse {
  path: string;
  message: string;

  constructor({ path, message }: UploadResponse) {
    Object.assign(this, { path, message });
  }
}
