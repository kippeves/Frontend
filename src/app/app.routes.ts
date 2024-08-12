import { Routes } from '@angular/router';
import { BookListComponent } from './features/books/pages/book-list.component';
import { authGuard as AuthGuard } from './core/auth/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './core/auth/auth.component';
import { BookEditFormComponent } from './features/books/pages/book-edit-form.component';
import { QuotesComponent } from './features/quotes/quotes.component';
import { BookCreateFormComponent } from './features/books/pages/create-form.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "books",
        pathMatch: "full"
    },
    {
        path: "",
        component: LayoutComponent,
        children:
            [
                {
                    path: 'login',
                    component: LoginComponent,
                    title: 'Logga In'
                },
                {
                    path: 'quotes',
                    component: QuotesComponent,
                    canActivate: [AuthGuard],
                    title: 'Citat'
                },
                {
                    path: 'books',
                    component: BookListComponent,
                    canActivate: [AuthGuard],
                    title: 'Böcker'
                },
                {
                    path: 'books/edit/:id',
                    component: BookEditFormComponent,
                    canActivate: [AuthGuard],
                    title: 'Ändra Bok'
                },
                {
                    path: 'books/create',
                    component: BookCreateFormComponent,
                    canActivate: [AuthGuard],
                    title: 'Lägg Till Bok'
                }
            ]
    }
]
