import { Component, OnDestroy, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore';

import { UI_IMPORTS } from '../shared/ui.imports';
import { FirestoreClient } from '../shared/firestore.client';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [...UI_IMPORTS, RouterLink],
    templateUrl: './user.html',
    styleUrl: './user.scss',
})
export class UserComponent implements OnDestroy {
    private dialog = inject(MatDialog);
    private fs = inject(FirestoreClient);

    private unsub?: Unsubscribe;

    allUsers = signal<any[]>([]);

    constructor() {
        const usersCol = collection(this.fs.db, 'users');

        this.unsub = onSnapshot(usersCol, (snapshot) => {
            const users = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as any),
            }));

            this.allUsers.set(users);
            console.log('Received changes from DB', users);
        });
    }

    ngOnDestroy(): void {
        this.unsub?.();
    }

    openDialog() {
        this.dialog.open(DialogAddUser);
    }
}
