import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  titre = "Mon application sur les Assignments !"

  assignments: Assignment[] = [
    { 
      nom: 'TP1 sur WebComponents, un lecteur audio amélioré', 
      rendu: true, 
      dateDeRendu: '2021-09-01' },
    { 
      nom: 'TP2 sur Angular, un joli gestionnaier de devoirs (Assignments)', 
      rendu: false, 
      dateDeRendu: '2021-09-15' },
    { 
      nom: 'TP3 sur Angular, utilisiation du router et de Web Services', 
      rendu: false, 
      dateDeRendu: '2021-10-01' }
  ];

}
interface Assignment {
  nom: string;
  rendu: boolean;
  dateDeRendu: string;
}
