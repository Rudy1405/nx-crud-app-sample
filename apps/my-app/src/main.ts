import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import NGXS Modules
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppState } from './app/shared/state/app.state';

const ngxsProviders = [
  importProvidersFrom(
    NgxsModule.forRoot([AppState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  )
];

const newAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    ...ngxsProviders,
    provideRouter(appRoutes),
    importProvidersFrom(BrowserAnimationsModule)
  ]
};

bootstrapApplication(AppComponent, newAppConfig).catch((err) =>
  console.error(err)
);
