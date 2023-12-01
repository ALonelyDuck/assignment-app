import { Component, /*Input,*/ Output, EventEmitter, OnInit } from '@angular/core';
import { Assignment } from '../assignments.model';
import { AssignmentsService } from '../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-assignment-detail',
    templateUrl: './assignment-detail.component.html',
    styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
    /* @Input() */ assignmentTransmis!:Assignment;
    @Output() deleteAssignment = new EventEmitter<Assignment>();

    constructor(private assignmentServices: AssignmentsService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit(): void {
        
        if (!this.authService.isLogSync()) {
            console.log("Not logged in");
            this.router.navigate(['/home']);
        }

        this.getAssignment();
    }

    getAssignment(): void {
        const id = +this.route.snapshot.params['id'];
        this.assignmentServices.getAssignment(id)
            .subscribe(assignment => this.assignmentTransmis = assignment);
    }

    onAssignmentRendu() {
        this.assignmentTransmis.rendu = true;

        this.assignmentServices.updateAssignment(this.assignmentTransmis)
            .subscribe(message => console.log(message));

        this.router.navigate(['/home']);
    }

    onEditAssignmentBtnClick() {
        this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], 
        {queryParams: {nom: this.assignmentTransmis.nom}, fragment: 'edition'});

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
                this.router.navigate(['/home']);
            }
        });
    }

    isAdmin(): boolean {
        return this.authService.isAdminSync();
    }

}
