import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from '../assignments.model';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

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
	onlyRendu = false;

	filterValue = '';

	pageEvent(event: PageEvent) {
		this.page = event.pageIndex + 1;
		this.limit = event.pageSize;
		this.getAssignmentsPagine(this.page, this.limit);
	}

	announceSortChange($event: Sort) {
		// Sort the assignments based on the sort event
		this.sortAssignments($event.active, $event.direction);
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

	// compare(a: any, b: any, isAsc: boolean) {
	// 	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);	
	// }

	rowClicked(row: any): void {
		console.log('Row clicked');
		this.router.navigate(['/assignment/' + row.id]);
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		if (filterValue === '') {
			this.getAssignmentsPagine(this.page, this.limit);
		} else {
			this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(assignments => {
				this.dataSource = assignments.filter(assignment => {
					return assignment.nom.toLowerCase().includes(filterValue.toLowerCase()) ||
						assignment.matiere.toLowerCase().includes(filterValue.toLowerCase());
				});
				this.totalDocs = this.dataSource.length;
			});
		}
	}

	displayedColumns: string[] = ['nom', 'matiere', 'dateDeRendu', 'auteur', 'rendu', 'note'];
	dataSource: Assignment[] = [];

	constructor(private router: Router, private assignmentsService: AssignmentsService, private authService: AuthService) { }

	ngOnInit(): void {
		if (!this.isLog()) {
			console.log('Not logged in')
			this.router.navigate(['/login']);
		}

		this.getAssignmentsPagine(this.page, this.limit);
	}

	isLog() {
		return this.authService.isLogSync();
	}

	// getAssignments() {
	// 	this.assignmentsService.getAssignments().subscribe(assignments => this.dataSource = assignments);
	// }

	getAssignmentsPagine(page: number, limit: number) {
		this.assignmentsService.getAssignmentsPagine(page, limit).subscribe(
			data => {
				this.totalDocs = data.length;
				this.totalPages = data.length;
				this.nextPage = data.nextPage;
				this.prevPage = data.prevPage;
				this.hasPrevPage = data.hasPrevPage;
				this.hasNextPage = data.hasNextPage;
				this.onlyRendu = false;
				console.log("Assignments paginés");
				console.log(data);
			}
		);
		this.assignmentsService.getAssignmentsPagineContent(page, limit).subscribe(
			data => {
				this.dataSource = data;
			}
		);
		this.dataSource = this.dataSource.filter(assignment => {
			return assignment.nom.toLowerCase().includes(this.filterValue.toLowerCase()) ||
				assignment.matiere.toLowerCase().includes(this.filterValue.toLowerCase());
		});
		this.totalDocs = this.dataSource.length;
	}

}
