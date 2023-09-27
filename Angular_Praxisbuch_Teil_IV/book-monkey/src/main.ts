import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import localeDe from '@angular/common/locales/de';

import { AppModule } from './app/app.module';

async function setupLocale() {
  if (localStorage.getItem('locale') !== 'de') {
    return 'en-US';
  }
  const response = await fetch('assets/messages.de.json');
  const result = await response.json();
  loadTranslations(result.translations);
  registerLocaleData(localeDe);
  return 'de';
}

setupLocale().then(localeValue => {
  platformBrowserDynamic([
    { provide: LOCALE_ID, useValue: localeValue }
  ])
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
