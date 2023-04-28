import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { UploadRoute } from '../enums/endpoint.enum';
import { FilesResponse } from '../models/files-response.model';
import { UploadResponse } from '../models/upload-response.model';

import { UploadService } from './upload.service';

describe(`UT: ${UploadService.name}`, () => {
  const enum should {
    createInstance = 'should create the app',
    uploadSingleFileInRoot = 'should upload a Single File in rootPath.',
    uploadSingleFileInPath = 'should upload a Single File in sub folder Path.',
    uploadManyFilesInRoot = 'should upload many Files in rootPath.',
    uploadManyFilesInPath = 'should upload many Files in sub folder Path.',
  }

  const createService = createHttpFactory(UploadService);
  let spectator: SpectatorHttp<UploadService> = null;

  beforeEach(() => (spectator = createService()));

  it(should.createInstance, () => {
    expect(spectator).not.toBeNull();
    expect(spectator.service).toBeInstanceOf(UploadService);
  });

  it(should.uploadSingleFileInRoot, () => {
    const mockFile = {} as any as File;
    const mockResponse: UploadResponse = {
      path: 'mock/upload/path',
      message: 'mock message',
    };

    spectator.service.file(mockFile).subscribe((res) => {
      expect(res).toBeInstanceOf(UploadResponse);
    });
    spectator
      .expectOne(`/api/v1${UploadRoute.file}`, HttpMethod.POST)
      .flush(mockResponse);
  });

  it(should.uploadSingleFileInPath, () => {
    const mockFile = {} as any as File;
    const mockResponse: UploadResponse = {
      path: 'mock/upload/path',
      message: 'mock message',
    };

    spectator.service.file(mockFile, 'mock/upload/path').subscribe((res) => {
      expect(res).toBeInstanceOf(UploadResponse);
    });
    spectator
      .expectOne(`/api/v1${UploadRoute.file}`, HttpMethod.POST)
      .flush(mockResponse);
  });

  it(should.uploadManyFilesInRoot, () => {
    const mockFiles = [{}] as any as File[];
    const mockResponse: any = {
      errors: { a: 'a', b: 'b', c: 'c' },
      successes: { a: 'a', b: 'b', c: 'c' },
    };

    spectator.service.files(mockFiles).subscribe((res) => {
      expect(res).toBeInstanceOf(FilesResponse);
    });
    spectator
      .expectOne(`/api/v1${UploadRoute.files}`, HttpMethod.POST)
      .flush(mockResponse);
  });

  it(should.uploadManyFilesInPath, () => {
    const mockFiles = [{}] as any as File[];
    const mockResponse: any = {
      errors: { a: 'a', b: 'b', c: 'c' },
      successes: { a: 'a', b: 'b', c: 'c' },
    };

    spectator.service.files(mockFiles, 'fake/sub/path').subscribe((res) => {
      expect(res).toBeInstanceOf(FilesResponse);
    });
    spectator
      .expectOne(`/api/v1${UploadRoute.files}`, HttpMethod.POST)
      .flush(mockResponse);
  });
});
