import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '@services/in-memory-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideHttpClient(withFetch()), commented because angular-in-memory-web-api does not work wich api fetch
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
          dataEncapsulation: false,
      })
  ),
  ]
};
