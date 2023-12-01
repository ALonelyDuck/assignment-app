import { Component, OnInit, /* Output, EventEmitter*/ } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from '../assignments.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-edit-assignment',
    templateUrl: './edit-assignment.component.html',
    styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

    assignment!: Assignment | undefined;

    nomDevoir: string = "";
    dateRendu!: Date;
    ajoutActive: boolean = false;

    constructor(private assignmentsService: AssignmentsService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit(): void {

        if (!this.authService.isLogSync()) {
            console.log("Not logged in");
            this.router.navigate(['/home']);
        }

        this.getAssignment();

        console.log("Query Params :");
        console.log(this.route.snapshot.queryParams);
        console.log("Fragment :");
        console.log(this.route.snapshot.fragment);
    }

    getAssignment() {
        const id = +this.route.snapshot.params['id'];

        this.assignmentsService.getAssignment(id).subscribe((assignment) => {
            if (!assignment) return;

            this.assignment = assignment;

            // Pour pré-remplir le formulaire

            this.nomDevoir = assignment.nom;
            this.dateRendu = assignment.dateDeRendu;
        });
    }

    onSaveAssignment() {
        if (!this.assignment) return;

        this.assignment.nom = this.nomDevoir;
        this.assignment.dateDeRendu = this.dateRendu;
        
        this.assignmentsService
            .updateAssignment(this.assignment)
            .subscribe((message) => {
                console.log(message);
                this.router.navigate(['/home']);
            });
    }
}