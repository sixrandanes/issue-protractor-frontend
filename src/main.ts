import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic  } from '@angular/platform-browser-dynamic';
import { IldaModule } from './app/ilda.module';

import { environment } from './app/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(IldaModule);