import { Component, OnInit, /* Output, EventEmitter*/ } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from '../assignments.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Users } from '../login/login.model';

@Component({
    selector: 'app-edit-assignment',
    templateUrl: './edit-assignment.component.html',
    styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

    assignment!: Assignment | undefined;
    activeUser: Users | null = null;

    nomDevoir: string = "";
    dateRendu!: Date;
    noteRendu!: number;
    ajoutActive: boolean = false;
    description: string;

    constructor(private assignmentsService: AssignmentsService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) { }

    // commentaire = '';
    // auteur = '';
    // messages = [];

    // submitComment() {
    //     const message = {
    //         commentaire: this.commentaire,
    //         auteur: this.authService.getActiveUser().username,
    //         role: this.authService.getActiveUser().role
    //     };
    //     this.messages.push(message);
    //     this.commentaire = '';
    //     this.auteur = '';
    // }

    ngOnInit(): void {

        if (!this.authService.isLogSync()) {
            console.log("Not logged in");
            this.router.navigate(['/home']);
        }

        this.getAssignment();

        // console.log("Query Params :");
        // console.log(this.route.snapshot.queryParams);
        // console.log("Fragment :");
        // console.log(this.route.snapshot.fragment);
    }

    getAssignment() {
        const id = +this.route.snapshot.params['id'];

        this.assignmentsService.getAssignment(id).subscribe((assignment) => {
            if (!assignment) return;

            this.assignment = assignment;
            // this.messages = JSON.parse(this.assignment.commentaire);

            // Pour pré-remplir le formulaire

            this.nomDevoir = assignment.nom;
            this.noteRendu = assignment.note;
            this.dateRendu = assignment.dateDeRendu;
            this.description = assignment.description;
        });
    }

    onSaveAssignment() {
        if (!this.assignment) return;

        this.assignment.nom = this.nomDevoir;
        this.assignment.dateDeRendu = this.dateRendu;
        // this.assignment.commentaire = JSON.stringify(this.messages);
        this.assignment.note = this.noteRendu;
        this.assignment.description = this.description;
        
        this.assignmentsService
            .updateAssignment(this.assignment)
            .subscribe((message) => {
                console.log(message);
                if (this.activeUser.role === 'etudiant') {
                    this.router.navigate(['/home']);
                }
                else {
                    this.router.navigate(['/table-view']);
                }
            });
    }

    getActiveUser(): Users {
        return this.authService.getActiveUser();
    }
}