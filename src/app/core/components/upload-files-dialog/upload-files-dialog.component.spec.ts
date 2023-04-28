import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { BehaviorSubject, of } from 'rxjs';
import { FolderInfo } from '../../../api/models/folder-info.model';
import { MimeTypesService } from '../../../api/services/mime-types.service';
import { SharedFolderService } from '../../../api/services/shared-folder.service';
import { UploadService } from '../../../api/services/upload.service';
import { MaterialModule } from '../../../material/material.module';
import { Path } from '../../models/path.model';
import { PathService } from '../../services/path.service';

import { UploadFilesDialogComponent } from './upload-files-dialog.component';

describe(`UT: ${UploadFilesDialogComponent.name}`, () => {
  const enum should {
    createInstance = 'should create the app',
  }

  const mockMimeTypesService: Required<MimeTypesService> = {
    getAllowedTypes: () => of(''),
  };
  const mockUploadService = {
    file: () => of({}),
    files: () => of({}),
  } as any as UploadService;
  const mockPathService: Required<PathService> = {
    pathSubject: new BehaviorSubject(new Path()),
    goToParent: () => of(new Path()),
    goToChild: () => of(new Path()),
  };
  const mockSharedFolderService: Required<SharedFolderService> = {
    folderInfoSubject: new BehaviorSubject<FolderInfo>(null),
    getFolderInfo: () => of(null),
  };

  const createComponent = createComponentFactory({
    component: UploadFilesDialogComponent,
    imports: [CommonModule, MaterialModule],
    providers: [
      mockProvider(MatDialogRef),
      mockProvider(MatSnackBar),
      mockProvider(MimeTypesService, mockMimeTypesService),
      mockProvider(PathService, mockPathService),
      mockProvider(UploadService, mockUploadService),
      mockProvider(SharedFolderService, mockSharedFolderService),
    ],
  });
  let spectator: Spectator<UploadFilesDialogComponent> = null;

  beforeEach(() => (spectator = createComponent()));

  it(should.createInstance, () => {
    expect(spectator).not.toBeNull();
    expect(spectator.component).toBeInstanceOf(UploadFilesDialogComponent);
  });
});
