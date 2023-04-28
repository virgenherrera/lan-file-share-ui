import { FileInfo, FileInfoArgs } from './file-info.model';

export type FolderInfoArgs = {
  files: FileInfoArgs[];
  folders: string[];
};

export class FolderInfo {
  files: FileInfo[] = [];
  folders: string[] = [];

  constructor(args: FolderInfoArgs) {
    this.files = args.files.map((file) => new FileInfo(file));
    this.folders = args.folders;
  }
}
