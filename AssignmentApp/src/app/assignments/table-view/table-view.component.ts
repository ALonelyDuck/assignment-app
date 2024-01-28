import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from '../assignments.model';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-table-view',
	templateUrl: './table-view.component.html',
	styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

	length = 0;
	page = 1;
	limit = 5;
	totalDocs = 0;
	totalPages = 0;
	nextPage = 0;
	prevPage = 0;
	hasPrevPage = false;
	hasNextPage = false;

	filterValue = '';
	isRendu = null;

	pageEvent(event: PageEvent) {
		this.page = event.pageIndex + 1;
		this.limit = event.pageSize;
		this.getAssignmentsPagine(this.page, this.limit);
	}

	tableSortChange($event: Sort) {
		this.sortAssignments($event.active, $event.direction);
	}

	filterRendu(arg: any) {
		if (arg === 'true') {
			this.isRendu = true;
		}
		else if (arg === 'false') {
			this.isRendu = false;
		}
		else if (arg === 'all') {
			this.isRendu = null;
		}
		this.filterAssignments();
	}

	sortAssignments(field: string, direction: string) {
		this.dataSource.sort((a, b) => {
			if (a[field] < b[field]) {
				return direction === 'asc' ? -1 : 1;
			} else if (a[field] > b[field]) {
				return direction === 'asc' ? 1 : -1;
			} else {
				return 0;
			}
		});
		this.dataSource = this.dataSource.filter(assignment => {
			return assignment.nom.toLowerCase().includes(this.filterValue.toLowerCase()) ||
				assignment.matiere.toLowerCase().includes(this.filterValue.toLowerCase());
		});
	}

	rowClicked(row: any): void {
		console.log('Row clicked');
		this.router.navigate(['/assignment/' + row.id]);
	}

	applyFilter(event: Event) {
		this.filterValue = (event.target as HTMLInputElement).value;
		this.filterAssignments();
	}

	displayedColumns: string[] = ['nom', 'matiere', 'dateDeRendu', 'auteur', 'rendu', 'note'];
	dataSource: Assignment[] = [];
	assignments: Assignment[] = [];

	constructor(private router: Router, private assignmentsService: AssignmentsService, private authService: AuthService) { }

	ngOnInit(): void {
		if (!this.isLog()) {
			console.log('Not logged in')
			this.router.navigate(['/login']);
		}

		this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(
			data => {
				this.totalDocs = data.length;
				this.totalPages = data.length;
				this.nextPage = data.nextPage;
				this.prevPage = data.prevPage;
				this.hasPrevPage = data.hasPrevPage;
				this.hasNextPage = data.hasNextPage;
				console.log("Assignments paginés");
				console.log(data);
			}
		);
		this.assignmentsService.getAssignmentsPagineContent(this.page, this.limit).subscribe(
			data => {
				this.assignments = data;
				this.dataSource = data;
			}
		);
	}

	isLog() {
		return this.authService.isLogSync();
	}

	getAssignmentsPagine(page: number, limit: number) {
		this.assignmentsService.getAssignmentsPagine(page, limit).subscribe(
			data => {
				this.totalDocs = data.length;
				this.totalPages = data.length;
				this.nextPage = data.nextPage;
				this.prevPage = data.prevPage;
				this.hasPrevPage = data.hasPrevPage;
				this.hasNextPage = data.hasNextPage;
				console.log("Assignments paginés");
				console.log(data);
			}
		);
		this.assignmentsService.getAssignmentsPagineContent(page, limit).subscribe(
			data => {
				this.dataSource = data;
			}
		);
	}

	filterAssignments() {
		this.dataSource = this.assignments;

		if (this.isRendu !== null) {
			this.dataSource = this.dataSource.filter(assignment => {
				return assignment.rendu === this.isRendu
			});
		}

		this.dataSource = this.dataSource.filter(assignment => {
			return assignment.nom.toLowerCase().includes(this.filterValue.toLowerCase()) ||
				assignment.matiere.toLowerCase().includes(this.filterValue.toLowerCase());
		});
		this.totalDocs = this.dataSource.length;
	}

}
