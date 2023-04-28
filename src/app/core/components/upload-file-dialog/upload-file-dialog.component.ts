import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, switchMap, tap } from 'rxjs';
import { MimeTypesService } from '../../../api/services/mime-types.service';
import { SharedFolderService } from '../../../api/services/shared-folder.service';
import { UploadService } from '../../../api/services/upload.service';
import { PathService } from '../../services/path.service';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss'],
})
export class UploadFileDialogComponent implements OnInit {
  accept$: Observable<string>;
  file: File = null;
  fileError: string = null;
  uploading = false;

  constructor(
    private dialogRef: MatDialogRef<UploadFileDialogComponent>,
    private matSnackBar: MatSnackBar,
    private mimeTypesService: MimeTypesService,
    private pathService: PathService,
    private uploadService: UploadService,
    private sharedFolderService: SharedFolderService,
  ) {}

  ngOnInit(): void {
    this.accept$ = this.mimeTypesService.getAllowedTypes();
  }

  inputFileChanged($event: any) {
    const file = $event.target?.files[0] as File;

    this.fileError = null;
    this.file = file || null;
  }

  uploadFile() {
    this.uploading = true;

    const { path } = this.pathService.pathSubject.value;

    return this.uploadService
      .file(this.file, path)
      .pipe(
        tap((res) =>
          this.matSnackBar.open(res.message, 'dismiss', { duration: 7e3 }),
        ),
        switchMap(() => this.sharedFolderService.getFolderInfo(path)),
      )
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: this.uploadFileError.bind(this),
      });
  }

  private uploadFileError(errorDetails: string[]) {
    const [error] = errorDetails;

    this.file = null;
    this.fileError = error;
    this.uploading = false;
  }
}
