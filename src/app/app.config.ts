import { APP_INITIALIZER, ApplicationConfig, EnvironmentProviders, LOCALE_ID, provideAppInitializer, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { makesReducer } from './store/makes.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { MakesEffects } from './store/makes.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { LdrTranslateService } from '@core';

const initializeTranslate = () => {
  inject(LdrTranslateService).use('es');
}


export const appConfig: ApplicationConfig = {
  providers:
    [
      { provide: LOCALE_ID, useValue: "es" },
      provideHttpClient(),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideAppInitializer(initializeTranslate),
      provideStore({ makes: makesReducer }),
      provideEffects([MakesEffects]),
      provideAnimationsAsync(),
      provideStoreDevtools({
        maxAge: 25,
        logOnly: false,
      }),
    ]
};
