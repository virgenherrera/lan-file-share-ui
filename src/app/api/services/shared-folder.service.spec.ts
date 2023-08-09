import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { SharedFolderRoute } from '../enums/endpoint.enum';
import { FolderInfo } from '../models/folder-info.model';

import { SharedFolderService } from './shared-folder.service';

describe(`UT: ${SharedFolderService.name}`, () => {
  const enum should {
    createInstance = 'should create the app',
    getRootFolder = 'Should Get root sharedFolder.',
    getSubFolder = 'Should Get sub-sharedFolder.',
  }

  const createService = createHttpFactory(SharedFolderService);
  let spectator: SpectatorHttp<SharedFolderService> = null;

  beforeEach(() => (spectator = createService()));

  it(should.createInstance, () => {
    expect(spectator).not.toBeNull();
    expect(spectator.service).toBeInstanceOf(SharedFolderService);
  });

  it(should.getRootFolder, () => {
    const mockResponse: FolderInfo = {
      files: [],
      folders: [],
    };

    spectator.service
      .getFolderInfo()
      .subscribe((res) =>
        expect(res).toBe(spectator.service.folderInfoSubject.value),
      );
    spectator
      .expectOne(`/api/v1${SharedFolderRoute.sharedFolder}`, HttpMethod.GET)
      .flush(mockResponse);
  });

  it(should.getSubFolder, () => {
    const path = 'path/to/sub/folder';
    const mockResponse: FolderInfo = {
      files: [],
      folders: [],
    };

    spectator.service
      .getFolderInfo(path)
      .subscribe((res) =>
        expect(res).toBe(spectator.service.folderInfoSubject.value),
      );
    spectator
      .expectOne(
        `/api/v1${SharedFolderRoute.sharedFolder}?path=${path}`,
        HttpMethod.GET,
      )
      .flush(mockResponse);
  });
});
