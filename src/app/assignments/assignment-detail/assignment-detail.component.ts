import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Assignment } from '../assignments.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmis!:Assignment;
  @Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor() { }

  ngOnInit(): void {
  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;
  }

  onDeleteAssignmentBtnClick() {
    this.deleteAssignment.emit(this.assignmentTransmis);
  }

}
