import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
    inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
    MAT_DATE_LOCALE,
    MAT_DATE_FORMATS,
    provideNativeDateAdapter,
} from '@angular/material/core';

import { environment } from '../environments/environment';

// ✅ AngularFire
import { provideFirebaseApp, FirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';

// ✅ Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

        // ✅ Firebase App zuerst
        provideFirebaseApp(() => initializeApp(environment.firebase)),

        // ✅ Firestore an die DI-App binden (kein DEFAULT-App-Race)
        provideFirestore(() => getFirestore(inject(FirebaseApp))),
    ],
};
