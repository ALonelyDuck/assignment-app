import { Injectable } from '@angular/core';
import { Users } from '../login/login.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // loggedIn = false;
    // activeUser: Users | null = null;

    users: Users[] = [];
    url: 'http://localhost:8010/api/users';

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    getUsers(): Observable<Users[]> {
        return this.http.get<Users[]>('http://localhost:8010/api/users');
    }

    getActiveUser(): Users {
        return JSON.parse(this.cookieService.get('activeUser'));
    }

    logIn(username: string, password: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.getUsers().subscribe(users => {
                this.users = users;

                const userExists = this.users.some(user => user.username === username && user.password === password);
                if (userExists) {
                    const activeUser = this.users.find(user => user.username === username && user.password === password);
                    this.cookieService.set('activeUser', JSON.stringify(activeUser));
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    }

    logOut() {
        // this.loggedIn = false;
        // this.activeUser = null;
        this.cookieService.delete('activeUser'); // Remove activeUser from cookie on logout
    }

    isLog(): Promise<boolean> {
        return Promise.resolve(this.cookieService.check('activeUser'));
    }

    isLogSync(): boolean {
        return this.cookieService.check('activeUser');
    }

    isAdmin(): Promise<boolean> {
        const activeUser = JSON.parse(this.cookieService.get('activeUser'));
        return Promise.resolve(activeUser?.role === 'enseignant');
    }
    
    isAdminSync(): boolean {
        const activeUser = JSON.parse(this.cookieService.get('activeUser'));
        return activeUser?.role === 'enseignant';
    }
}
