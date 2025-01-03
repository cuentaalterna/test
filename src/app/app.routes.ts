import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./make/make-list.component').then(m => m.MakeListComponent),
    },
    {
        path: 'make/:id',
        loadComponent: () => import('./make/make-detail/make-detail.component').then(m => m.MakeDetailComponent),
    },
    {
        path: '**',
        redirectTo: '',
    }
];
