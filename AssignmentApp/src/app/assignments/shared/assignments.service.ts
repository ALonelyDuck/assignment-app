import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { Assignment } from '../assignments.model';
import { Matiere } from '../matieres.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdPopulateAssignments } from './data';

@Injectable({
    providedIn: 'root'
})
export class AssignmentsService {
	//         dateDeRendu: new Date('2021-09-15')
	//     },
	//     {
	//         id: 3,
	//         nom: 'TP3 sur Angular, utilisiation du router et de Web Services',
	//         rendu: false,
	//         dateDeRendu: new Date('2021-10-01')
	//     }
	// ];
    //     },
    //     {
    //         id: 3,
    //         nom: 'TP3 sur Angular, utilisiation du router et de Web Services',
    //         rendu: false,
    //         dateDeRendu: new Date('2021-10-01')
    //     }
    // ];

    assignments: Assignment[] = [];

    // assignments: Assignment[] = [
    //     {
    //         id: 1,
    //         nom: 'TP1 sur WebComponents, un lecteur audio amélioré',
    //         rendu: true,
    //         dateDeRendu: new Date('2021-09-01')
    //     },
    //     {
    //         id: 2,
    //         nom: 'TP2 sur Angular, un joli gestionnaire de devoirs (Assignments)',
    //         rendu: false,
    //         dateDeRendu: new Date('2021-09-15')
    //     },
    //     {
    //         id: 3,
    //         nom: 'TP3 sur Angular, utilisiation du router et de Web Services',
    //         rendu: false,
    //         dateDeRendu: new Date('2021-10-01')
    //     }
    // ];

    constructor(private loggingService: LoggingService, private http: HttpClient) { }

    // Avant MongoDB

    // getAssignments(): Observable<Assignment[]> {
    //     return of(this.assignments);
    // }

    // getAssignment(id: number): Observable<Assignment|undefined> {
    //     const a: Assignment | undefined = this.assignments.find(a => a.id === id);
    //     return of(a);
    // }

    // addAssignments(assignment: Assignment): Observable<string> {
    //     this.assignments.push(assignment);
    //     this.loggingService.log(assignment.nom, 'ajouté');
    //     return of('Assignment ajouté');
    // }

    // updateAssignment(assignment: Assignment): Observable<string> {
    //     this.loggingService.log(assignment.nom, 'modifié');
    //     return of('Assignment service: assignment modifié !');
    // }

    // deleteAssignment(assignment: Assignment): Observable<string> {
    //     this.loggingService.log(assignment.nom, 'supprimé');

    //     const index = this.assignments.indexOf(assignment);
    //     if (index >= 0) {
    //         this.assignments.splice(index, 1);
    //     }

    //     return of('Assignment service: assignment supprimé !');
    // }

    // API MongoDB
    url = 'https://angular-assignments-project-api.onrender.com';

    getAssignments(): Observable<Assignment[]> {
        return this.http.get<Assignment[]>(this.url + '/api/assignments');
    }

    getAssignmentsPagine(page: number, limit: number) {
        return this.http.get<any>(this.url + '/api/assignments' + '?page=' + page + '&limit=' + limit);
	}

    getAssignment(id: number): Observable<Assignment | undefined> {
        // const a: Assignment | undefined = this.http.get<Assignment>(this.url + '/' + id);
        // return of(a);
        return this.http.get<Assignment>(this.url + '/api/assignments' + '/' + id);
    }

    getAssignmentsCount(): Observable<number> {
        return this.http.get<number>(this.url + '/api/assignments' + '/count');
    }

    getAssignmentsPagineContent(page: number, limit: number) {
        return this.http.get<any>(this.url + '/api/assignments/paginate' + '?page=' + page + '&limit=' + limit);
	}

    getAssignmentsLimit(limit: number) {
        return this.http.get<any>(this.url + '/api/assignments/limit' + '?limit=' + limit);
	}

    addAssignments(assignment: Assignment): Observable<any> {
        return this.http.post<Assignment>(this.url + '/api/assignments', assignment);
    }

    updateAssignment(assignment: Assignment): Observable<string> {
        return this.http.put<string>(this.url + '/api/assignments/', assignment);
    }

    deleteAssignment(assignment: Assignment): Observable<string> {
        this.loggingService.log(assignment.nom, 'supprimé');

        const index = this.assignments.indexOf(assignment);
        if (index >= 0) {
            this.assignments.splice(index, 1);
        }

        return this.http.delete<string>(this.url + '/api/assignments' + '/' + assignment._id);
    }

    deleteAllAssignment(): Observable<string> {
        return this.http.delete<string>(this.url + '/api/assignments/deleteAll');
    }

    getMatieres(): Observable<Matiere[]> {
        return this.http.get<Matiere[]>(this.url + '/api/matieres');
    }

    populateDBAssignments(): Observable<any> {
        let appelAddAssignments: Observable<any>[] = [];

        bdPopulateAssignments.forEach(assignment => {
            const newAssignment = new Assignment();
            newAssignment.id = assignment.id;
            newAssignment.nom = assignment.nom;
            newAssignment.rendu = assignment.rendu;
            newAssignment.dateDeRendu = new Date(assignment.dateDeRendu);
            newAssignment.commentaire = JSON.stringify([]);
            newAssignment.auteur = assignment.auteur;
            newAssignment.matiere = assignment.matiere;
    
            appelAddAssignments.push(this.addAssignments(newAssignment));
        });

        return forkJoin(appelAddAssignments);
    }

}
