import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import { FeaturedComponent } from './component/featured/featured.component';
import { PostComponent } from './component/post/post.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { PostService } from './services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { FormsModule } from '@angular/forms';
import {SuiModule} from 'ng2-semantic-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { FileDropModule } from 'ngx-file-drop';
import { ConnectionService } from 'ng-connection-service';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule,
    FormsModule,
    SuiModule,
    FileDropModule
  ],
  providers: [PostService, ConnectionService],
  declarations: [HomeComponent, FeaturedComponent, PostComponent, DashboardComponent],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
