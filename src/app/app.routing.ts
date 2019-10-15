import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { BoardComponent } from './component/board/board.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'board', loadChildren: './modules/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuardService] },
];
export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
