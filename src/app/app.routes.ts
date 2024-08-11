import { Routes } from '@angular/router';
import { BookListComponent } from './features/books/pages/book-list.component';
import { authGuard } from './core/auth/services/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './core/auth/auth.component';
import { BookEditFormComponent } from './features/books/pages/edit-form.component';
import { QuotesComponent } from './features/quotes/quotes.component';

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
                },
                {
                    path: 'quotes',
                    component: QuotesComponent,
                    canActivate: [authGuard]
                },
                {
                    path: 'books',
                    component: BookListComponent,
                    canActivate: [authGuard],
                },
                {
                    path: 'books/edit/:id',
                    component: BookEditFormComponent,
                    canActivate: [authGuard],
                }
            ]
    }
]
