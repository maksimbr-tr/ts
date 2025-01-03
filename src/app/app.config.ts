import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { employeeFeature } from '@employee-offboarding/data-access';
import * as employeeEffects from '@employee-offboarding/data-access/data-access/employees/employee.effects';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideStore({ employee: employeeFeature.reducer }),
    provideEffects(employeeEffects),
    provideHttpClient()
  ]
};
