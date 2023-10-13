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
  ajoutActive:boolean = false;
  nomDevoir:string= "";
  dateRendu!:Date;

  ngOnInit(): void {
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000);
  }

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.rendu = false;
    newAssignment.dateDeRendu = this.dateRendu;

    this.assignments.push(newAssignment);
  }

  assignments: Assignment[] = [
    {
      nom: 'TP1 sur WebComponents, un lecteur audio amélioré',
      rendu: true,
      dateDeRendu: new Date('2021-09-01')
    },
    {
      nom: 'TP2 sur Angular, un joli gestionnaier de devoirs (Assignments)',
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