import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: '**',
        component: HomeComponent
    },
    {
        path: 'items',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }

];

export const AppRoutes = RouterModule.forRoot(routes);
