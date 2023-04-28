import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SharedFolderComponent } from './components/shared-folder/shared-folder.component';
import { UploadFileDialogComponent } from './components/upload-file-dialog/upload-file-dialog.component';
import { UploadFilesDialogComponent } from './components/upload-files-dialog/upload-files-dialog.component';
import { PathService } from './services/path.service';

@NgModule({
  declarations: [
    // routed components
    SharedFolderComponent,

    // components
    NavBarComponent,
    UploadFileDialogComponent,
    UploadFilesDialogComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [NavBarComponent, SharedFolderComponent],
  providers: [PathService],
})
export class CoreModule {}
