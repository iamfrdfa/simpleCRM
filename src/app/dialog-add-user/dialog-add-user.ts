// src/app/dialog-add-user/dialog-add-user.ts
import { Component, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { addDoc, collection } from 'firebase/firestore';

import { UI_IMPORTS } from '../shared/ui.imports';
import { FirestoreClient } from '../shared/firestore.client';
import { User } from '../../models/user.class';

@Component({
    selector: 'app-dialog-add-user',
    standalone: true,
    imports: [...UI_IMPORTS],
    templateUrl: './dialog-add-user.html',
    styleUrl: './dialog-add-user.scss',
})
export class DialogAddUser {
    private dialogRef = inject(MatDialogRef<DialogAddUser>);
    private fs = inject(FirestoreClient);

    user = new User();
    birthDate?: Date;

    loading = signal(false);

    async saveUser() {
        if (!this.birthDate) {
            console.warn('birthDate ist nicht gesetzt.');
            return;
        }

        // @ts-ignore
        this.user.birthDate = this.birthDate.getTime();

        this.loading.set(true);

        try {
            const usersCol = collection(this.fs.db, 'users');
            const docRef = await addDoc(usersCol, this.user.toJSON());
            console.log('User successfully added! ID:', docRef.id);

            this.user = new User();
            this.birthDate = undefined;

            this.dialogRef.close(true);
        } catch (err) {
            console.error('Error adding user:', err);
        } finally {
            this.loading.set(false);
        }
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
