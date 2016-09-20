import { NgModule, CUSTOM_ELEMENTS_SCHEMA }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { GridEffects } from './store';
import { GridComponent } from './components/grid.component';
import { IldaGridService } from './services/ilda-grid.service';
import { IldaGridComponent } from './container/ilda-grid.component';

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.run(GridEffects)
    ],
    declarations: [
            GridComponent, IldaGridComponent
    ],
    exports: [
        IldaGridComponent,
        GridComponent
    ],
    providers: [
        IldaGridService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IldaGridModule { }
