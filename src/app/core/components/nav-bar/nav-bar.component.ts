import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';
import { UploadFilesDialogComponent } from '../upload-files-dialog/upload-files-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  @ViewChild('uploadMenuTrigger', { read: ElementRef })
  uploadMenuTrigger: ElementRef;

  private dialogOptions: MatDialogConfig = { restoreFocus: false };

  constructor(private dialog: MatDialog) {}

  openUploadFile() {
    const dialogRef = this.dialog.open(
      UploadFileDialogComponent,
      this.dialogOptions,
    );

    this.handleDialogDismiss(dialogRef);
  }

  openUploadFiles() {
    const dialogRef = this.dialog.open(
      UploadFilesDialogComponent,
      this.dialogOptions,
    );

    this.handleDialogDismiss(dialogRef);
  }

  private handleDialogDismiss(ref: MatDialogRef<any | any>) {
    return ref
      .afterClosed()
      .subscribe((result) =>
        !result
          ? this.uploadMenuTrigger.nativeElement.click()
          : this.uploadMenuTrigger.nativeElement.focus(),
      );
  }
}
