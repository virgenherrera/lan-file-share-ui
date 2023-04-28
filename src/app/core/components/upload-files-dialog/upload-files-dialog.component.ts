import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, switchMap, tap } from 'rxjs';
import { MimeTypesService } from '../../../api/services/mime-types.service';
import { SharedFolderService } from '../../../api/services/shared-folder.service';
import { UploadService } from '../../../api/services/upload.service';
import { PathService } from '../../services/path.service';

@Component({
  selector: 'app-upload-files-dialog',
  templateUrl: './upload-files-dialog.component.html',
  styleUrls: ['./upload-files-dialog.component.scss'],
})
export class UploadFilesDialogComponent implements OnInit {
  accept$: Observable<string>;
  files: File[] = null;
  uploading = false;

  constructor(
    private dialogRef: MatDialogRef<UploadFilesDialogComponent>,
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
    const files = $event.target?.files as File[];

    this.files = files ? Array.from(files) : null;
  }

  uploadFile() {
    this.uploading = true;

    const { path } = this.pathService.pathSubject.value;

    return this.uploadService
      .files(this.files, path)
      .pipe(
        map(({ successCount, errorCount }) => {
          let message = `Successfully uploaded ${this.pluralize(
            successCount,
            'file',
          )}.`;

          if (errorCount) {
            message +=
              '\n' +
              `but, ${this.pluralize(
                errorCount,
                'file',
              )} that already existed were omitted.`;
          }

          return message;
        }),
        tap((message) =>
          this.matSnackBar.open(message, 'dismiss', {
            duration: 7e3,
          }),
        ),
        switchMap(() => this.sharedFolderService.getFolderInfo(path)),
      )
      .subscribe({
        next: () => this.dialogRef.close(true),
      });
  }

  private pluralize(count: number, noun: string, suffix = 's') {
    return `${count} ${noun}${count !== 1 ? suffix : ''}`;
  }
}
