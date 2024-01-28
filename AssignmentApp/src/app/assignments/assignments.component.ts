import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from './shared/assignments.service';
import { Assignment } from './assignments.model';
import { AuthService } from './shared/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

    titre: string = "Mon application sur les Assignments !";
    assignments!: Assignment[];
    assignmentsCount: number;

    constructor(private assignmentServices: AssignmentsService,
        private authService: AuthService,
        private router: Router) { }

    assignmentSelectionne!: Assignment;
    formVisible: boolean = false;
    detailVisible: boolean = false;

    ngOnInit(): void {
        //this.assignments = this.assignmentServices.getAssignments();
        // this.getAssignmentsLimit();

        if (!this.isLog()) {
            console.log('Not logged in')
            this.router.navigate(['/login']);
        }

        this.getAssignmentsLimit();
        this.getAssignmentsCount();
    }

    isLog(): boolean {
        return this.authService.isLogSync();
    }

    getAssignments() {
        this.assignmentServices.getAssignments().subscribe(assignments => this.assignments = assignments);
    }

    getAssignmentsLimit() {
        this.assignmentServices.getAssignmentsLimit(20).subscribe(assignments => this.assignments = assignments);
    }

    getAssignmentsCount() {
        this.assignmentServices.getAssignmentsCount().subscribe(count => {
            this.assignmentsCount = count;
        });
    }

    assignmentClique(assignment: Assignment) {
        if (this.isLog()) {
            if (this.assignmentSelectionne === assignment) {
                this.detailVisible = !this.detailVisible;
            } else {
                this.detailVisible = true;
            }

            this.assignmentSelectionne = assignment;
        }
    }

    onAddAssignmentBtnClick() {
        this.formVisible = true;
    }

    // onNouvelAssignment(event: Assignment) {
    //   // this.assignments.push(event);
    //   this.assignmentServices.addAssignments(event)
    //   .subscribe(message => console.log(message));

    //   this.formVisible = false;
    // }

    onDeleteAssignment(event: Assignment) {
        this.detailVisible = false;

        if (this.assignments.length === 0) {
            this.formVisible = true;
        }
    }
}