import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'Checkout',
        component: CheckoutComponent
    },
    {
        // takes user to home when specified route is undefined
        path: '**',
        component: HomeComponent
    }

];

export const AppRoutes = RouterModule.forRoot(routes);
