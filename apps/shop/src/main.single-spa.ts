import { NgZone } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { singleSpaAngular, getSingleSpaExtraProviders, enableProdMode } from '@eyesoft/single-spa-angular';

import { loadMontserrat } from './fonts';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: () =>
    loadMontserrat().then(() =>
      platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule),
    ),
  template: '<shop-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
// This export is done only for testing purposes, thus we're
// able to access the `Router` class globally when running E2E
// tests with Cypress.
export { Router } from '@angular/router';
