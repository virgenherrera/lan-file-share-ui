import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Path } from '../models/path.model';

import { PathService } from './path.service';

describe(`UT: ${PathService.name}`, () => {
  const enum should {
    createInstance = 'should create the app',
    goToParentThrow = 'Should throw when trying to goToParent when already in RootPath.',
    goToChild = 'Should dispatch child path.',
    goToParent = 'Should go to parent Path.',
  }

  const createService = createServiceFactory(PathService);
  let spectator: SpectatorService<PathService> = null;

  beforeEach(() => (spectator = createService()));

  it(should.createInstance, () => {
    expect(spectator).not.toBeNull();
    expect(spectator.service).toBeInstanceOf(PathService);
    expect(spectator.service.pathSubject.value).toBeInstanceOf(Path);
  });

  it(should.goToParentThrow, () => {
    expect(() => spectator.service.goToParent()).toThrowError(
      'already on <Home>',
    );
  });

  it(should.goToChild, () => {
    const folderName = 'mock-folder-name';
    expect(() => spectator.service.goToChild(folderName)).not.toThrow();
    expect(spectator.service.pathSubject.value).toBeInstanceOf(Path);
    expect(spectator.service.pathSubject.value.path).toBe(folderName);
    expect(spectator.service.pathSubject.value.name).toBe(folderName);
  });

  it(should.goToParent, () => {
    const folderName = 'mock-folder-name';
    expect(() => spectator.service.goToChild(folderName)).not.toThrow();
    expect(() => spectator.service.goToParent()).not.toThrow();
    expect(spectator.service.pathSubject.value).toBeInstanceOf(Path);
    expect(spectator.service.pathSubject.value.path).toBe('');
    expect(spectator.service.pathSubject.value.name).toBe('<Home>');
  });
});
