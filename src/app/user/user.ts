import {Component} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {DialogAddUser} from '../dialog-add-user/dialog-add-user';
import { User } from '../../models/user.class';
import {MatCard} from '@angular/material/card';

@Component({
    selector: 'app-user',
    imports: [
        MatIcon,
        MatFabButton,
        MatTooltipModule,
        MatCard
    ],
    templateUrl: './user.html',
    styleUrl: './user.scss',
})
export class UserComponent {

    user = new User;
    constructor(public dialog: MatDialog) {

    }

    openDialog() {
        this.dialog.open(DialogAddUser)
    }
}
