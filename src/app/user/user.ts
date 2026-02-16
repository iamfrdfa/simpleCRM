// src/app/user/user.ts
import { Component, inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore';

import { UI_IMPORTS } from '../shared/ui.imports';
import { FirestoreClient } from '../shared/firestore.client';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';
import { User } from '../../models/user.class';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [...UI_IMPORTS],
    templateUrl: './user.html',
    styleUrl: './user.scss',
})
export class UserComponent implements OnDestroy {
    private dialog = inject(MatDialog);
    private fs = inject(FirestoreClient);

    private unsub?: Unsubscribe;

    user = new User();
    allUsers: any[] = [];

    constructor() {
        const usersCol = collection(this.fs.db, 'users');

        this.unsub = onSnapshot(
            usersCol,
            (snapshot) => {
                this.allUsers = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log('Received changes from DB', this.allUsers);
            },
            (err) => console.error('Firestore stream error:', err)
        );
    }

    ngOnDestroy(): void {
        this.unsub?.();
    }

    openDialog() {
        this.dialog.open(DialogAddUser);
    }
}
