import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AboutComponent } from './about/about.component';
import { PaymentComponent } from './payment/payment.component';
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
        path: 'items',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'payment',
        component: PaymentComponent
    }

];

export const AppRoutes = RouterModule.forRoot(routes);
