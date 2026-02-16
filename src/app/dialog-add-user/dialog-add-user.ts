import {
    Component,
    inject,
    runInInjectionContext,
    EnvironmentInjector,
    signal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogRef, MatDialogClose,
} from '@angular/material/dialog';

import {MatFormField, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';

import {Firestore} from '@angular/fire/firestore';
import {collection, addDoc} from 'firebase/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';

import {User} from '../../models/user.class';

@Component({
    selector: 'app-dialog-add-user',
    standalone: true,
    providers: [provideNativeDateAdapter()],
    imports: [
        MatDialogContent,
        MatFormField,
        MatLabel,
        MatDialogActions,
        MatButton,
        FormsModule,
        MatDialogTitle,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatDialogClose,
        MatCardModule
    ],
    templateUrl: './dialog-add-user.html',
    styleUrl: './dialog-add-user.scss',
})
export class DialogAddUser {
    private firestore = inject(Firestore);
    private envInjector = inject(EnvironmentInjector);
    private dialogRef = inject(MatDialogRef<DialogAddUser>);

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
            await runInInjectionContext(this.envInjector, async () => {
                const usersCol = collection(this.firestore as any, 'users');
                const docRef = await addDoc(usersCol, this.user.toJSON());
                console.log('User successfully added! ID:', docRef.id);
            });

            // ✅ optional: falls du vor dem Close noch resetten willst
            this.user = new User();
            this.birthDate = undefined;

            // ✅ Dialog schließen (Material API)
            this.dialogRef.close(true); // true = "success" (optional)
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
