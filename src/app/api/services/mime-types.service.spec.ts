import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { UploadRoute } from '../enums/endpoint.enum';
import { MimeTypesResponse } from '../models/mime-types.model';
import { MimeTypesService } from './mime-types.service';

describe(`UT: ${MimeTypesService.name}`, () => {
  const enum should {
    createInstance = 'should create the app',
    requestMimeTypes = 'Should GET mime-types from API and transform it into accept string.',
  }

  const createService = createHttpFactory(MimeTypesService);
  let spectator: SpectatorHttp<MimeTypesService> = null;

  beforeEach(() => (spectator = createService()));

  it(should.createInstance, () => {
    expect(spectator).not.toBeNull();
    expect(spectator.service).toBeInstanceOf(MimeTypesService);
  });

  it(should.requestMimeTypes, () => {
    const mockResponse: MimeTypesResponse = {
      application: ['application/application'],
      audio: ['audio/audio'],
      font: ['font/font'],
      image: ['image/image'],
      text: ['text/text'],
      video: ['video/video'],
    };
    const expectedResponse = Object.values(mockResponse).join(', ');

    spectator.service.getAllowedTypes().subscribe((res) => {
      expect(res).toBe(expectedResponse);
    });
    spectator
      .expectOne(`/api/v1${UploadRoute.mimeTypes}`, HttpMethod.GET)
      .flush(mockResponse);
  });
});
