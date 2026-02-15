import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
    inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    provideNativeDateAdapter,
} from '@angular/material/core';

import { environment } from '../environments/environment';

// ✅ AngularFire
import { provideFirebaseApp, FirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// ✅ Firebase SDK (nur initializeApp!)
import { initializeApp } from 'firebase/app';

// Optik: dd.MM.yyyy
export const DE_DATE_FORMATS = {
    parse: { dateInput: 'dd.MM.yyyy' },
    display: {
        dateInput: 'dd.MM.yyyy',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'dd.MM.yyyy',
        monthYearA11yLabel: 'MMMM yyyy',
    },
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes),

        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
        { provide: MAT_DATE_FORMATS, useValue: DE_DATE_FORMATS },

        // ✅ 1) Firebase App
        provideFirebaseApp(() => initializeApp(environment.firebase)),

        // ✅ 2) Firestore EXPLIZIT an diese App binden (Fix für app/no-app)
        provideFirestore(() => getFirestore(inject(FirebaseApp))),
    ],
};
