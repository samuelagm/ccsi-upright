import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { BoardComponent } from './component/board/board.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
