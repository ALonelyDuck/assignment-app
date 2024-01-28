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
    url = 'https://angular-assignments-project-api.onrender.com/api/users';

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    getUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(this.url);
    }

    setActiveUser(user: Users) {
        this.cookieService.set('activeUser', JSON.stringify(user));
    }

    getActiveUser(): Users {
        return JSON.parse(this.cookieService.get('activeUser'));
    }

    logOut() {
        this.cookieService.delete('activeUser');
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

