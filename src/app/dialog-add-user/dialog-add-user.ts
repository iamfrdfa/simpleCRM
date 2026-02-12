import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {User} from '../../models/user.class';


@Component({
    selector: 'app-dialog-add-user',
    providers: [provideNativeDateAdapter()],
    imports: [
        MatDialogContent,
        MatFormField,
        MatLabel,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        FormsModule,
        MatDialogTitle,
        MatInputModule,
        MatFormFieldModule,
        MatIcon,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    templateUrl: './dialog-add-user.html',
    styleUrl: './dialog-add-user.scss',
})
export class DialogAddUser {

    user = new User;
    birthDate: Date | undefined;
    saveUser() {
        // @ts-ignore
        this.user.birthDate = this.birthDate.getTime()
        console.log('Current user is:', this.user);
    }
}
