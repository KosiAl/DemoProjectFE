// auth guard
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Shared/Interfaces/user';

export const AuthGuard = () => {
    const router = inject(Router);
    const token = localStorage.getItem('token');
    let user:any = localStorage.getItem('currentUser');

    user = JSON.parse(user || null);

    if (token && user) {
        return true;
    } else {
        return router.parseUrl('/login');
    }
};
