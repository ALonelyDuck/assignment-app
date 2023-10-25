import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { Assignment } from '../assignments.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  @Output() nouvelAssignment = new EventEmitter<Assignment>();

  nomDevoir:string= "";
  dateRendu!:Date;
  ajoutActive:boolean = false;

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

    // this.assignments.push(newAssignment);
    this.nouvelAssignment.emit(newAssignment);
  }
}
