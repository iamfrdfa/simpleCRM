import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { User } from './user/user';

export const routes: Routes = [
    { path: '', component: Dashboard },          // Root
    { path: 'dashboard', component: Dashboard }, // /dashboard
    { path: 'user', component: User },           // /user
    { path: '**', redirectTo: '' },             // optional: Fallback
];
