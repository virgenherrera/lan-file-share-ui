import { SharedFolderRoute } from '../enums/endpoint.enum';

export type FileInfoArgs = Pick<
  FileInfo,
  'fileName' | 'path' | 'size' | 'createdAt' | 'updatedAt'
>;

export class FileInfo {
  fileName!: string;
  href!: string;
  path!: string;
  size!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor({ fileName, path, size, createdAt, updatedAt }: FileInfoArgs) {
    const href = `/api/v1${SharedFolderRoute.fileStream}?path=${path}`;

    Object.assign(this, { fileName, href, path, size, createdAt, updatedAt });
  }
}
