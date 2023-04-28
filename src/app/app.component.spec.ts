import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AppComponent } from './app.component';

describe(`UT: ${AppComponent.name}`, () => {
  const enum should {
    createInstance = 'should create the app',
  }

  const createComponent = createComponentFactory({
    component: AppComponent,
    shallow: true,
  });
  let spectator: Spectator<AppComponent> = null;

  beforeEach(() => (spectator = createComponent()));

  it(should.createInstance, () => {
    expect(spectator).not.toBeNull();
    expect(spectator.component).toBeInstanceOf(AppComponent);
  });
});
