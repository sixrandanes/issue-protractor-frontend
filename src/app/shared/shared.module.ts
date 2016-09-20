import { CommonModule }       from '@angular/common';
import { BrowserModule }       from '@angular/platform-browser';
import { HttpModule }       from '@angular/http';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IldaComboboxValueAccessorDirective } from './directives/adapters/ilda-combo-box-value-accessor.directive';
import { RadioValueAccessorDirective } from './directives/adapters/radio-value-accessor.directive';
import { CheckedValueAccessorDirective } from './directives/adapters/checked-value-accessor.directive';
import { IldaGridModule } from './modules/grid/grid.module';
import { ReactiveFormsModule }        from '@angular/forms';

@NgModule({
  imports:      [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    IldaGridModule
  ],
  declarations: [
    IldaComboboxValueAccessorDirective,
    RadioValueAccessorDirective,
    CheckedValueAccessorDirective
  ],
  exports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    IldaComboboxValueAccessorDirective,
    RadioValueAccessorDirective,
    CheckedValueAccessorDirective,
    IldaGridModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}

@NgModule({
  exports:   [ SharedModule ]
})
export class SharedRootModule {}
