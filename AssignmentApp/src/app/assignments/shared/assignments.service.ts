import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments.model';
import { LoggingService } from './logging.service';

@Injectable({
    providedIn: 'root'
})
export class AssignmentsService {

    assignments: Assignment[] = [
        {
            id: 1,
            nom: 'TP1 sur WebComponents, un lecteur audio amélioré',
            rendu: true,
            dateDeRendu: new Date('2021-09-01')
        },
        {
            id: 2,
            nom: 'TP2 sur Angular, un joli gestionnaire de devoirs (Assignments)',
            rendu: false,
            dateDeRendu: new Date('2021-09-15')
        },
        {
            id: 3,
            nom: 'TP3 sur Angular, utilisiation du router et de Web Services',
            rendu: false,
            dateDeRendu: new Date('2021-10-01')
        }
    ];

    constructor(private loggingService: LoggingService) { }

    getAssignments(): Observable<Assignment[]> {
        return of(this.assignments);
    }

    getAssignment(id: number): Observable<Assignment|undefined> {
        const a: Assignment | undefined = this.assignments.find(a => a.id === id);
        return of(a);
    }

    addAssignments(assignment: Assignment): Observable<string> {
        this.assignments.push(assignment);
        this.loggingService.log(assignment.nom, 'ajouté');
        return of('Assignment ajouté');
    }

    updateAssignment(assignment: Assignment): Observable<string> {
        this.loggingService.log(assignment.nom, 'modifié');
        return of('Assignment service: assignment modifié !');
    }

    deleteAssignment(assignment: Assignment): Observable<string> {
        this.loggingService.log(assignment.nom, 'supprimé');

        const index = this.assignments.indexOf(assignment);
        if (index >= 0) {
            this.assignments.splice(index, 1);
        }

        return of('Assignment service: assignment supprimé !');
    }
}
