import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './assignments/shared/auth.service';
import { AssignmentsService } from './assignments/shared/assignments.service';
import { Users } from './assignments/login/login.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'Assignment App';
    opened = false;

    assignmentsCount: number;
    activeUser: Users;

    constructor(private router: Router, private authService: AuthService, private assignmentsService: AssignmentsService) { }

    ngOnInit(): void {
        if (this.authService.isLogSync()) {
            this.activeUser = this.getActiveUser();
        }
    }

    goHome() {
        if (!this.activeUser) {
            return;
        }

        if (this.activeUser.role === 'etudiant') {
            this.router.navigate(['/home']);
        } else if (this.activeUser.role === 'enseignant') {
            this.router.navigate(['/table-view']);
        }
    }

    isLog() {
        // console.log(this.authService.isLogSync());
        return this.authService.isLogSync();
    }

    getActiveUser() {
        return this.authService.getActiveUser();
    }

    getAssignmentsCount() {
        this.assignmentsService.getAssignmentsCount().subscribe(count => {
            this.assignmentsCount = count;
        });
    }

    populateDBAssignments() {
        if (this.assignmentsCount >= 500) {
            console.log("Il y a déjà trop d'assignments dans la base de données");
            console.log("Veuillez vider la base de données avant de la remplir à nouveau");
        } else {
            this.assignmentsService.populateDBAssignments().subscribe(() => {
                console.log("Ajout des Assignments");
                window.location.reload();
            });
        }
    }

    deleteDBAssignments() {
        if (this.assignmentsCount > 0) {
            console.log("La base de données est déjà vide");
        } else {
            this.assignmentsService.deleteAllAssignment().subscribe(message => console.log(message));
            console.log("Suppression des Assignments");
            window.location.reload();
        }
    }

    // login() {
    //     if (!this.authService.loggedIn) {
    //         this.authService.logIn();
    //     } else {
    //         this.authService.logOut();
    //         this.router.navigate(['/home']);
    //     }
    // }
}
