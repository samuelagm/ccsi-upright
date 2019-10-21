import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  declarations: [DashboardContainerComponent],
  exports: [
    DashboardContainerComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
