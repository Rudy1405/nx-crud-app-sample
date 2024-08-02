import { Routes  } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';


export const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'categories', component: CategoryComponent },
];
