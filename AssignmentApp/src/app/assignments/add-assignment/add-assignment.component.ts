import { Component, OnInit, /* Output, EventEmitter*/ } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from '../assignments.model';
import { Matiere } from '../matieres.model';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Users } from '../login/login.model';

@Component({
    selector: 'app-add-assignment',
    templateUrl: './add-assignment.component.html',
    styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
    // @Output() nouvelAssignment = new EventEmitter<Assignment>();

    nomDevoir: string = "";
    nomMatiere: string = "";
    description: string = "";
    dateRendu!: Date;

    ajoutActive: boolean = false;
    activeUser: Users | null = null;

    matieres!: Matiere[];

    constructor(private assignmentsService: AssignmentsService,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit(): void {

        if (!this.authService.isLogSync()) {
            console.log("Not logged in");
            this.router.navigate(['/home']);
        }

        this.activeUser = this.getActiveUser();

        setTimeout(() => {
            this.ajoutActive = true;
        }, 2000);

        this.getMatieres();
    }

    getMatieres(): void {
        this.assignmentsService.getMatieres().subscribe(matieres => {
            this.matieres = matieres;
        });
    }

    onSubmit() {
        console.log(this.dateRendu);
        const newAssignment = new Assignment();
        newAssignment.id = Math.floor(Math.random() * 1000000);
        newAssignment.nom = this.nomDevoir;
        newAssignment.rendu = false;
        
        // Add 2 hours to the dateRendu
        const dateRenduWithAddedHours = new Date(this.dateRendu);
        dateRenduWithAddedHours.setHours(dateRenduWithAddedHours.getHours() + 2);
        newAssignment.dateDeRendu = dateRenduWithAddedHours;
        
        newAssignment.commentaire = JSON.stringify([]);
        newAssignment.auteur = this.authService.getActiveUser().username;
        newAssignment.matiere = this.nomMatiere;
        newAssignment.description = this.description;

        // this.assignments.push(newAssignment);
        // this.nouvelAssignment.emit(newAssignment);

        this.assignmentsService.addAssignments(newAssignment)
            .subscribe(message => console.log(message));


        if (this.activeUser.role === 'etudiant') {
            this.router.navigate(['/home']);
        }
        else {
            this.router.navigate(['/table-view']);
        }
    }

    getActiveUser(): Users {
        return this.authService.getActiveUser();
    }

}
