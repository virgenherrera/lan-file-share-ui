import { CommonModule } from '@angular/common';
import {
  byText,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { BehaviorSubject, of } from 'rxjs';
import { FolderInfo } from '../../../api/models/folder-info.model';
import { SharedFolderService } from '../../../api/services/shared-folder.service';
import { MaterialModule } from '../../../material/material.module';
import { Path } from '../../models/path.model';
import { PathService } from '../../services/path.service';

import { SharedFolderComponent } from './shared-folder.component';

describe(`UT: ${SharedFolderComponent.name}`, () => {
  const enum should {
    createInstance = 'should create the app',
    showSpinnerByDefault = 'Should show spinner as default view.',
    showListWithFolderContent = 'Should Show list with FolderContent.',
    navigateToChildPath = 'Should Navigate to child Path.',
    navigateToParentPath = 'Should Navigate to parent path when in child Path.',
  }

  const mockPathService: Required<PathService> = {
    pathSubject: new BehaviorSubject(new Path()),
    goToParent: () => of(new Path()),
    goToChild: () => of(new Path()),
  };
  const mockSharedFolderService: Record<keyof SharedFolderService, any> = {
    folderInfoSubject: new BehaviorSubject<FolderInfo>(null),
    getFolderInfo: () => of(null),
  };

  const createComponent = createComponentFactory({
    component: SharedFolderComponent,
    imports: [CommonModule, MaterialModule],
    providers: [
      mockProvider(PathService, mockPathService),
      mockProvider(SharedFolderService, mockSharedFolderService),
    ],
  });
  let spectator: Spectator<SharedFolderComponent> = null;

  beforeEach(() => (spectator = createComponent()));

  afterEach(() => {
    const sub =
      mockSharedFolderService.folderInfoSubject as BehaviorSubject<FolderInfo>;

    sub.next(null);
  });

  it(should.createInstance, () => {
    expect(spectator).not.toBeNull();
    expect(spectator.component).toBeInstanceOf(SharedFolderComponent);
  });

  it(should.showSpinnerByDefault, () => {
    expect(spectator.query('mat-spinner')).not.toBeHidden();
    expect(spectator.query('mat-list')).toBeHidden();
  });

  it(should.showListWithFolderContent, () => {
    const sub =
      mockSharedFolderService.folderInfoSubject as BehaviorSubject<FolderInfo>;

    sub.next(
      new FolderInfo({
        folders: ['folder-a', 'folder-b'],
        files: [
          {
            fileName: 'file-1',
            path: '',
            size: '1Mb',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      }),
    );

    spectator.detectComponentChanges();

    expect(spectator.query('mat-spinner')).toBeHidden();
    expect(spectator.query('mat-list')).not.toBeHidden();
  });

  it(should.navigateToChildPath, () => {
    const sub =
      mockSharedFolderService.folderInfoSubject as BehaviorSubject<FolderInfo>;
    const foo = new FolderInfo({
      folders: ['folder-a', 'folder-b'],
      files: [
        {
          fileName: 'file-1',
          path: '',
          size: '1Mb',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    sub.next(foo);

    spectator.detectComponentChanges();

    expect(spectator.query('mat-spinner')).toBeHidden();
    expect(spectator.query('mat-list')).not.toBeHidden();

    const folderBtn = spectator.query(
      byText(foo.folders[0], { selector: 'button' }),
    ) as HTMLSelectElement;

    expect(folderBtn).toBeTruthy();

    spectator.click(folderBtn);
  });

  it(should.navigateToParentPath, () => {
    const pathSub = mockPathService.pathSubject;
    const folderSub =
      mockSharedFolderService.folderInfoSubject as BehaviorSubject<FolderInfo>;
    const foo = new FolderInfo({
      folders: ['folder-a', 'folder-b'],
      files: [
        {
          fileName: 'file-1',
          path: '',
          size: '1Mb',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });
    const nextPath = pathSub.value;

    nextPath.parent = nextPath;

    folderSub.next(foo);
    pathSub.next(nextPath);

    spectator.detectComponentChanges();

    expect(spectator.query('mat-spinner')).toBeHidden();
    expect(spectator.query('mat-list')).not.toBeHidden();

    const folderBtn = spectator.query(
      byText(nextPath.parent.name, { selector: 'button' }),
    ) as HTMLSelectElement;

    expect(folderBtn).toBeTruthy();

    spectator.click(folderBtn);
  });
});
