import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './component/home/home.component';
import { PostComponent } from './component/post/post.component';
import { FeaturedComponent } from './component/featured/featured.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            { path: '', component: HomeComponent },
            { path: 'post', component: PostComponent },
            { path: 'featured', component: FeaturedComponent }
        ]
    }

];
// export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
