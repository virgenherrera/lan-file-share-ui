import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedFolderService } from './services/shared-folder.service';
import { UploadService } from './services/upload.service';
@NgModule({
  imports: [HttpClientModule],
  providers: [SharedFolderService, UploadService],
})
export class ApiModule {}
