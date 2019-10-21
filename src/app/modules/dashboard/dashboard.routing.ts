import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './component/home/home.component';
import { PostComponent } from './component/post/post.component';
import { FeaturedComponent } from './component/featured/featured.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProductsComponent } from './component/products/products.component';
import { OrdersComponent } from './component/orders/orders.component';
import { SuggestionsComponent } from './component/suggestions/suggestions.component';
import { TestimonialsComponent } from './component/testimonials/testimonials.component';
import { UsersComponent } from './component/users/users.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: 'posts', component: PostComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'suggestions', component: SuggestionsComponent },
            { path: 'testimonials', component: TestimonialsComponent },
            { path: 'users', component: UsersComponent },
            { path: '', redirectTo: '/board/home' }
        ]
    }

];
// export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
