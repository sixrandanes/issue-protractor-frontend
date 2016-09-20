import { NgModule, CUSTOM_ELEMENTS_SCHEMA }           from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { PaysListComponent } from './components/liste/pays-list.component';
import { PaysService } from './service/pays.service';
import { PaysListPageComponent } from './pages/liste/pays-list.page.component';
import { paysRouting } from './pays.routes';
import { EffectsModule } from '@ngrx/effects';
import { PaysEffects } from './store';

@NgModule({
  imports: [
    SharedModule,
    paysRouting,
    EffectsModule.run(PaysEffects)
  ],
  declarations: [
    PaysListComponent,
    PaysListPageComponent
  ],
  exports: [
    PaysListPageComponent
  ],
  providers: [
    PaysService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class PaysModule { }
