import { Component, OnInit, /* Output, EventEmitter*/ } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from '../assignments.model';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-add-assignment',
    templateUrl: './add-assignment.component.html',
    styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
    // @Output() nouvelAssignment = new EventEmitter<Assignment>();

    nomDevoir: string = "";
    dateRendu!: Date;
    ajoutActive: boolean = false;

    constructor(private assignmentsService: AssignmentsService,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit(): void {

        if (!this.authService.isLogSync()) {
            console.log("Not logged in");
            this.router.navigate(['/home']);
        }

        setTimeout(() => {
            this.ajoutActive = true;
        }, 2000);
    }

    onSubmit() {
        const newAssignment = new Assignment();
        newAssignment.id = Math.floor(Math.random() * 1000000);
        newAssignment.nom = this.nomDevoir;
        newAssignment.rendu = false;
        newAssignment.dateDeRendu = this.dateRendu;

        // this.assignments.push(newAssignment);
        // this.nouvelAssignment.emit(newAssignment);

        this.assignmentsService.addAssignments(newAssignment)
            .subscribe(message => console.log(message));

        this.router.navigate(['/home']);
    }
}
