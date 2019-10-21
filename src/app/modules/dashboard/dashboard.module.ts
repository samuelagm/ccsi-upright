import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import { FeaturedComponent } from './component/featured/featured.component';
import { PostComponent } from './component/post/post.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { PostService } from './services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { StatsService } from './services/stats.service';
import { ChartService } from './services/chart.service';
import { ProductsComponent } from './component/products/products.component';
import { OrdersComponent } from './component/orders/orders.component';
import { SuggestionsComponent } from './component/suggestions/suggestions.component';
import { TestimonialsComponent } from './component/testimonials/testimonials.component';
import { UsersComponent } from './component/users/users.component';
import { ProductsService } from './services/products.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ClarityModule
  ],
  providers: [PostService, StatsService, ChartService, ProductsService],
  declarations: [HomeComponent, FeaturedComponent, PostComponent, DashboardComponent, ProductsComponent, OrdersComponent, SuggestionsComponent, TestimonialsComponent, UsersComponent],
  // bootstrap: [DashboardComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class DashboardModule { }
