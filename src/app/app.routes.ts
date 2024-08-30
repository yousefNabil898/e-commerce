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
import { DetailesComponent } from './components/detailes/detailes.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';

export const routes: Routes = [
    {
        path: "", component: AuthLayoutComponent, children: [
            { path: "", redirectTo: "login", pathMatch: "full" },
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent },
            { path: "forget", component: ForgetpasswordComponent },
        ]
    },
    {
        path: "", component: BlankLayoutComponent,canActivate:[authGuard], children: [
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", component: HomeComponent,title:"home" },
            { path: "proudect", component: ProudectComponent,title:"proudect" },
            { path: "categories", component: CategoriesComponent,title:"categories" },
            { path: "cart", component: CartComponent ,title:"cart"},
            { path: "brand", component: BrandsComponent ,title:"brand"},
            { path: "detailes/:id", component: DetailesComponent,title:"detailes" },
        ]
    },
    { path: "**", component: NotfoundComponent },
];
