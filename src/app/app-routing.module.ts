import { Route } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './Shared/Services/auth.guard';

export const appRoutes: Route[] = [
    // Auth routes for guests
    {
        path: 'login',
        children: [
            {
                path: '',
                loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
            },
        ],
    },
    {
        path: '',
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
            },
        ],
    },
    {
        path: 'register',
        children: [
            {
                path: '',
                loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule),
            },
        ],
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: '/admin/list', pathMatch: 'full' },
            {
                path: '',
                canActivate: [AuthGuard],
                loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
            },
            {
                path: 'favorites',
                canActivate: [AuthGuard],
                loadChildren: () => import('./admin/Favorites/favorites.module').then((m) => m.FavoritesModule),
            },
            {
                path: 'list',
                canActivate: [AuthGuard],
                loadChildren: () => import('./admin/List/list.module').then((m) => m.ListModule),
            },
            {
                path: 'dialog/:id',
                canActivate: [AuthGuard],
                loadChildren: () => import('./admin/Dialog/dialog.module').then((m) => m.DialogModule),
            }
        ],
    },
];
