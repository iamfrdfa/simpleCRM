import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { User } from '../models/user.class';
import {UserComponent} from './user/user';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'dashboard', component: Dashboard },
    { path: 'user', component: UserComponent },
    { path: '**', redirectTo: '' }
];
