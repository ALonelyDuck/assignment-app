import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignments.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  constructor() { }

  titre:string = "Mon application sur les Assignments !";
  assignmentSelectionne!:Assignment;
  formVisible:boolean = false;
  detailVisible:boolean = false;

  ngOnInit(): void {

  }

  assignmentClique(assignment:Assignment) {
    this.assignmentSelectionne = assignment;
    this.detailVisible = true;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  onNouvelAssignment(event:Assignment) {
    this.assignments.push(event);
    this.formVisible = false;
  }

  onDeleteAssignment(event:Assignment) {
    const index = this.assignments.indexOf(event);
    if (index >= 0) {
      this.assignments.splice(index, 1);
    }

    this.detailVisible = false;

    if (this.assignments.length === 0) {
      this.formVisible = true;
    }
  }

  assignments: Assignment[] = [
    {
      nom: 'TP1 sur WebComponents, un lecteur audio amélioré',
      rendu: true,
      dateDeRendu: new Date('2021-09-01')
    },
    {
      nom: 'TP2 sur Angular, un joli gestionnaire de devoirs (Assignments)',
      rendu: false,
      dateDeRendu: new Date('2021-09-15')
    },
    {
      nom: 'TP3 sur Angular, utilisiation du router et de Web Services',
      rendu: false,
      dateDeRendu: new Date('2021-10-01')
    }
  ];
}