import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: MaterialModule.importedSubModules,
  exports: MaterialModule.importedSubModules,
})
export class MaterialModule {
  static readonly importedSubModules: NgModule['exports'] = [MatButtonModule];
}
