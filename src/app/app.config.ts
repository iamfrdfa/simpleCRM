// src/app/app.config.ts
import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

import { environment } from '../environments/environment';

// AngularFire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes),

        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },

        // Firebase App (DEFAULT)
        provideFirebaseApp(() => initializeApp(environment.firebase)),

        // Firestore an DEFAULT App
        provideFirestore(() => getFirestore()),
    ],
};
