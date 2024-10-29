import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptor/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Include HTTP Client
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Allow multiple interceptors
    },
    ...appConfig.providers, provideAnimationsAsync(), // Spread the existing appConfig providers
  ],
}).catch((err) => console.error(err));
