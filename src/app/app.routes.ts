import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProudectComponent } from './components/proudect/proudect.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: "", component: AuthLayoutComponent, children: [
            { path: "", redirectTo: "login", pathMatch: "full" },
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent }
        ]
    },
    {
        path: "", component: BlankLayoutComponent,canActivate:[authGuard], children: [
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "proudect", component: ProudectComponent },
            { path: "categories", component: CategoriesComponent },
            { path: "cart", component: CartComponent },
            { path: "brand", component: BrandsComponent },
        ]
    },
    { path: "**", component: NotfoundComponent },
];
