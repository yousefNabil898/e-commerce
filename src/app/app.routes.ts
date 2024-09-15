import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            {
                path: 'login',
                loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
            },
            {
                path: 'register',
                loadComponent: () => import('./components/register/register.component').then((m) => m.RegisterComponent),
            },
            {
                path: 'forget',
                loadComponent: () => import('./components/forgetpassword/forgetpassword.component').then((m) => m.ForgetpasswordComponent),
            },
        ],
    },
    {
        path: '',
        component: BlankLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
                title: 'Home',
            },
            {
                path: 'proudect',
                loadComponent: () => import('./components/proudect/proudect.component').then((m) => m.ProudectComponent),
                title: 'Proudect',
            },
            {
                path: 'categories',
                loadComponent: () => import('./components/categories/categories.component').then((m) => m.CategoriesComponent),
                title: 'Categories',
            },
            {
                path: 'cart',
                loadComponent: () => import('./components/cart/cart.component').then((m) => m.CartComponent),
                title: 'Cart',
            },
            {
                path: 'brand',
                loadComponent: () => import('./components/brands/brands.component').then((m) => m.BrandsComponent),
                title: 'Brand',
            },
            {
                path: 'wishlist',
                loadComponent: () => import('./components/wishlist/wishlist.component').then((m) => m.WishlistComponent),
                title: 'Wishlist',
            },
            {
                path: 'order/:id',
                loadComponent: () => import('./components/order/order.component').then((m) => m.OrderComponent),
                title: 'Order',
            },
            {
                path: 'detailes/:id',
                loadComponent: () => import('./components/detailes/detailes.component').then((m) => m.DetailesComponent),
                title: 'Details',
            },
            {
                path: 'allorders',
                loadComponent: () => import('./components/allorders/allorders.component').then((m) => m.AllordersComponent),
            },
        ],
    },
    { path: '**', component: NotfoundComponent },
];
