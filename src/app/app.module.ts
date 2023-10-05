import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonTemplateComponent } from './button-template/button-template.component';
import { AssignmentsComponent } from './assignments/assignments.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ButtonTemplateComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
