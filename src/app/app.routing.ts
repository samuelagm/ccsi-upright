import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'board', loadChildren: './modules/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuardService] },
];

@NgModule(
    {
        imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false })],
        exports: [RouterModule]
    }
)
export class AppRoutingModule {};
