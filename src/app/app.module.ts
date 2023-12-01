import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonTemplateComponent } from './button-template/button-template.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';

import { authGuard } from './assignments/shared/auth.guard';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './assignments/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

const MY_DATE_FORMAT = {
    parse: {
        dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
    },
    display: {
        dateInput: 'MM/DD/YYYY', // this is how your date will get displayed on the Input
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

const routes : Routes = [
    // Home page
    {
        path: '', component: AssignmentsComponent
    },
    {
        path: 'home', component: AssignmentsComponent
    },
    {
        path: 'add', component: AddAssignmentComponent
    },
    {
        path: 'assignment/:id', component: AssignmentDetailComponent
    },
    {
        path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [authGuard]
    },
    {
        path: 'login', component: LoginComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        AssignmentsComponent,
        AssignmentDetailComponent,
        AddAssignmentComponent,
        EditAssignmentComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        BrowserAnimationsModule,
        ButtonTemplateComponent,
        MatIconModule,
        MatDividerModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatCheckboxModule,
        RouterModule.forRoot(routes),
        MatSlideToggleModule,
        ReactiveFormsModule
    ],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE]
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MY_DATE_FORMAT
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
