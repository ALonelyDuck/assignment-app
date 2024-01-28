import { Component, /*Input,*/ Output, EventEmitter, OnInit } from '@angular/core';
import { Assignment } from '../assignments.model';
import { AssignmentsService } from '../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Users } from '../login/login.model';

@Component({
    selector: 'app-assignment-detail',
    templateUrl: './assignment-detail.component.html',
    styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
    /* @Input() */ assignmentTransmis!: Assignment;
    @Output() deleteAssignment = new EventEmitter<Assignment>();

    constructor(private assignmentServices: AssignmentsService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) { }

    noteRendu!: string;
    remarque!: string;

    activeUser: Users | null = null;

    ngOnInit(): void {

        if (!this.authService.isLogSync()) {
            console.log("Not logged in");
            this.router.navigate(['/home']);
        }

        this.activeUser = this.getActiveUser();
        this.getAssignment();
    }

    commentaire = '';
    auteur = '';
    date = '';
    messages = [];

    submitComment() {
        const message = {
            commentaire: this.commentaire,
            auteur: this.authService.getActiveUser().username,
            role: this.authService.getActiveUser().role,
            date: new Date().toLocaleString()
        };
        if (message.commentaire === '') return;
        this.messages.push(message);
        this.commentaire = '';
        this.auteur = '';
        this.date = '';

        this.onSaveAssignment();
    }

    onSaveAssignment() {
        if (!this.assignmentTransmis) return;

        this.assignmentTransmis.commentaire = JSON.stringify(this.messages);
        
        this.assignmentServices
            .updateAssignment(this.assignmentTransmis)
            .subscribe((message) => {
                console.log(message);
            });
    }

    getAssignment(): void {
        const id = +this.route.snapshot.params['id'];
        this.assignmentServices.getAssignment(id)
            .subscribe(assignment => {
                this.assignmentTransmis = assignment;
                this.messages = JSON.parse(this.assignmentTransmis.commentaire);

                if (this.assignmentTransmis.description) {
                    this.remarque = this.assignmentTransmis.description;
                }
                else {
                    this.remarque = "Aucune remarque";
                }

                if (this.assignmentTransmis.note) {
                    this.noteRendu = this.assignmentTransmis.note.toString();
                }
                else {
                    this.noteRendu = "Non évalué";
                }
            });
    }

    onAssignmentRendu() {
        this.assignmentTransmis.rendu = true;

        this.assignmentServices.updateAssignment(this.assignmentTransmis)
            .subscribe(message => console.log(message));

        // this.router.navigate(['/home']);
    }

    onEditAssignmentBtnClick() {
        this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'],
            { queryParams: { nom: this.assignmentTransmis.nom }, fragment: 'edition' });

    }

    onDeleteAssignmentBtnClick() {
        this.assignmentServices.deleteAssignment(this.assignmentTransmis)
            .subscribe(message => console.log(message));

        this.assignmentTransmis = null;

        this.assignmentServices.getAssignments().subscribe((assignments: Assignment[]) => {
            if (assignments.length === 0) {
                this.router.navigate(['/add']);
            }
            else {
                if (this.activeUser.role === 'etudiant') {
                    this.router.navigate(['/home']);
                }
                else {
                    this.router.navigate(['/table-view']);
                }
            }
        });
    }

    isAdmin(): boolean {
        return this.authService.isAdminSync();
    }

    isLogSync(): boolean {
        return this.authService.isLogSync();
    }

    getActiveUser(): Users {
        return this.authService.getActiveUser();
    }

}
