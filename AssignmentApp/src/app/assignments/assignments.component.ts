import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from './shared/assignments.service';
import { Assignment } from './assignments.model';
import { AuthService } from './shared/auth.service';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

    titre: string = "Mon application sur les Assignments !";
    assignments!: Assignment[];

    constructor(private assignmentServices: AssignmentsService,
        private authService: AuthService) { }

    assignmentSelectionne!: Assignment;
    formVisible: boolean = false;
    detailVisible: boolean = false;

    ngOnInit(): void {
        //this.assignments = this.assignmentServices.getAssignments();
        this.getAssignments();
    }

    getAssignments() {
        this.assignmentServices.getAssignments().subscribe(assignments => this.assignments = assignments);
    }

    assignmentClique(assignment: Assignment) {
        if (this.authService.isLog()) {
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

    isLog() {
        // console.log(this.authService.isLogSync());
        return this.authService.isLogSync();
    }
}