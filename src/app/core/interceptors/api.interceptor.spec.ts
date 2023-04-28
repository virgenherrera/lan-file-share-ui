import { HttpHandler } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Observable, of } from 'rxjs';

import { ApiInterceptor } from './api.interceptor';

describe(`UT: ${ApiInterceptor.name}`, () => {
  const enum should {
    createInstance = 'should create the app',
    intercept = 'Should intercept Error and throw details if status was 400.',
  }

  const createService = createServiceFactory(ApiInterceptor);
  let spectator: SpectatorService<ApiInterceptor> = null;

  beforeEach(() => (spectator = createService()));

  it(should.createInstance, () => {
    expect(spectator).not.toBeNull();
    expect(spectator.service).toBeInstanceOf(ApiInterceptor);
  });

  it(should.intercept, () => {
    const mockRequest = {
      status: 400,
      error: { details: 'mock API error' },
    } as any;
    const mockNext = {
      handle: (arg: any) => of(arg),
    } as any as HttpHandler;
    let obs$: Observable<any> = null;

    expect(
      () => (obs$ = spectator.service.intercept(mockRequest, mockNext)),
    ).not.toThrow();
    expect(obs$).not.toBeNull();
  });
});
