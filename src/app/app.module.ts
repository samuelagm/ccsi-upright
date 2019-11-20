import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { BoardComponent } from './component/board/board.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ProductsService } from './modules/dashboard/services/products.service';
import { StatsService } from './modules/dashboard/services/stats.service';
import { ChartService } from './modules/dashboard/services/chart.service';
import { PostService } from './modules/dashboard/services/post.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,
  ],
  providers: [PostService, StatsService, ChartService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
