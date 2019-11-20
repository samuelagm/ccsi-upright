import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import { FeaturedComponent } from './component/featured/featured.component';
import { PostComponent } from './component/post/post.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { ProductsComponent } from './component/products/products.component';
import { OrdersComponent } from './component/orders/orders.component';
import { SuggestionsComponent } from './component/suggestions/suggestions.component';
import { TestimonialsComponent } from './component/testimonials/testimonials.component';
import { UsersComponent } from './component/users/users.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ClarityModule
  ],
  declarations: [HomeComponent, FeaturedComponent, PostComponent, DashboardComponent, ProductsComponent, OrdersComponent, SuggestionsComponent, TestimonialsComponent, UsersComponent],
  // bootstrap: [DashboardComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class DashboardModule { }
