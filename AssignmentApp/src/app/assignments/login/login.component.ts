import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Users } from '../login/login.model';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    
    constructor(private authService: AuthService, private router: Router) { }

    users: Users[] = [];
    activeUser: Users | null = null;
    UserInitials: string = '';
    hide: boolean = true;

    login = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    isLogFailed = false;
    alreadyLogged = false;
    getErrorLoggin = 'Incorrect username or password';

    ngOnInit(): void {
        this.getUsers();
        
        if (this.authService.isLogSync()) {
            this.alreadyLogged = true;
            this.getActiveUser();
            this.UserInitials = this.activeUser?.prenom.charAt(0) + this.activeUser?.nom.charAt(0);
        }
        else {
            this.alreadyLogged = false;
        }
    }

    getUsers() {
        this.authService.getUsers().subscribe(users => {this.users = users;});
    }

    getActiveUser() {
        this.activeUser = this.authService.getActiveUser();
    }

    setActiveUser(user: Users) {
        this.authService.setActiveUser(user);
    }

    logIn() {
        console.log(this.users);
        if (this.login.valid) {
            const username = this.login.value.username;
            const password = this.login.value.password;

            const user = this.users.find(u => u.username === username && u.password === password);
            if (user) {
                console.log('Login successful');
                this.setActiveUser(user);
                while (this.authService.isLogSync() === false) {
                    this.isLogSync();
                }
                location.reload();
            } else {
                this.isLogFailed = true;
                this.login.setErrors({ unauthenticated: true });
                this.login.reset();
                console.log('Login failed');
            }
        }
    }

    logOut() {
        this.authService.logOut();
        this.login.reset();
        this.alreadyLogged = false;
        console.log('Logout');
    }

    isLogSync(): any {
        console.log(this.authService.isLogSync())
        this.authService.isLogSync()
    }

    get getUsername() { return this.login.get('username'); }
    get getPassword() { return this.login.get('password'); }

}
