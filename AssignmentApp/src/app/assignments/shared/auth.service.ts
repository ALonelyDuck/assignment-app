import { Injectable } from '@angular/core';
import { Users } from '../login/login.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    loggedIn = false;
    getUsers: Users | null = null;

    users: Users[] = [
        { login: 'user', password: 'user', role: 'user' },
        { login: 'admin', password: 'admin', role: 'admin' }
    ];

    logIn(username: string, password: string): boolean {
        const user = this.users.find(u => u.login === username && u.password === password);
        if (user) {
            this.getUsers = user;
            this.loggedIn = true;
            return true;
        }
        return false;
    }

    logOut() {
        this.loggedIn = false;
        this.getUsers = null;
    }

    isLog(): Promise<boolean> {
        return Promise.resolve(this.loggedIn);
    }

    isLogSync(): boolean {
        return this.loggedIn;
    }

    isAdmin(): Promise<boolean> {
        return this.isLog().then(isLoggedIn => {
            return isLoggedIn && this.getUsers?.role === 'admin';
        });
    }

    isAdminSync(): boolean {
        return this.loggedIn && this.getUsers?.role === 'admin';
    }
}
