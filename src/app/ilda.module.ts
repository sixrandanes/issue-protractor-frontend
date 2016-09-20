import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IldaAppComponent } from './ilda.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import reducers from './shared/store/reducers';
import actions from './shared/store/actions';
import services from './shared/services';
import { routing } from './ilda.routes';
import { SharedModule } from './shared/shared.module';
import PaysModule from './business/referentiel/pays/pays.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    IldaAppComponent
  ],
  imports: [
    routing,
    PaysModule,
    SharedModule.forRoot(),
    StoreModule.provideStore(reducers),
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    }),
    StoreLogMonitorModule
  ],
  providers: [
    services,
    actions,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  schemas:   [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IldaAppComponent]
})
export class IldaModule {}
