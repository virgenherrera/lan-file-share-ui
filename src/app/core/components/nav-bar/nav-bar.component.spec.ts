import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {
  byText,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { of } from 'rxjs';
import { MaterialModule } from '../../../material/material.module';

import { NavBarComponent } from './nav-bar.component';

describe(`UT: ${NavBarComponent.name}`, () => {
  const enum should {
    createInstance = 'should create the app',

    openUploadFile = 'Should dispatch openUploadFile in dialog Open.',
    openUploadFiles = 'Should dispatch openUploadFiles in dialog Open.',
  }

  const mockResult: any = null;
  const mockMatDialog = {
    open: () => ({
      afterClosed: () => of(mockResult),
    }),
  };

  const createComponent = createComponentFactory({
    component: NavBarComponent,
    imports: [CommonModule, MaterialModule],
    providers: [mockProvider(MatDialog, mockMatDialog)],
  });
  let spectator: Spectator<NavBarComponent> = null;

  beforeEach(() => (spectator = createComponent()));

  it(should.createInstance, () => {
    expect(spectator).not.toBeNull();
    expect(spectator.component).toBeInstanceOf(NavBarComponent);
  });

  it(should.openUploadFile, () => {
    spectator.click(byText('Upload...'));

    expect(spectator.query('#upload-file')).toHaveText('a File');

    spectator.click(byText('a File'));
  });

  it(should.openUploadFiles, () => {
    spectator.click(byText('Upload...'));

    expect(spectator.query('#upload-many-files')).toHaveText('many Files');

    spectator.click(byText('many Files'));
  });
});
