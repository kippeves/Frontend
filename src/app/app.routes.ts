import { Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookEntryComponent } from './pages/book-entry/book-entry.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'books',
                component: BookListComponent,
                canActivate: [authGuard],
            },
            {
                path: 'details/:id',
                component: BookEntryComponent,
                canActivate: [authGuard]
            },
        ]
    },
];
