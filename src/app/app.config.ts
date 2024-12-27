import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appReducers } from './store/reducer';
import { appEffects } from './store/effects';
import { apiPrefixInterceptorTsInterceptor } from './interceptors/api-prefix.interceptor.ts.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(appReducers),
    provideEffects(...appEffects),
    provideHttpClient(
      withInterceptors([apiPrefixInterceptorTsInterceptor, authInterceptor]),
    ),
    provideAnimations(),
    provideToastr(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
    provideAnimationsAsync(),
  ],
};
