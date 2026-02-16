// src/app/shared/firestore.client.ts
import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore, getFirestore } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreClient {
    private app = inject(FirebaseApp);

    // echte Firebase SDK Firestore-Instanz (keine AngularFire wrapper)
    readonly db: Firestore = getFirestore(this.app);
}
