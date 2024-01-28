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
    hide: boolean = false;

    login = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    isLogFailed = false;
    alreadyLogged = false;
    getErrorLoggin = 'Incorrect username or password';

    ngOnInit(): void {
        if (this.authService.isLogSync()) {
            this.alreadyLogged = true;
            this.getActiveUser();
            this.UserInitials = this.activeUser?.prenom.charAt(0) + this.activeUser?.nom.charAt(0);
        }
        else {
            this.alreadyLogged = false;
        }
    }

    onLogin() {
        if (this.login.valid) {
            const username = this.login.value.username;
            const password = this.login.value.password;

            if (this.authService.logIn(username, password)) {
                console.log('Login successful')
                this.router.navigate(['/home']);
            } else {
                this.isLogFailed = true;
                this.login.setErrors({ unauthenticated: true });
                console.log('Login failed')
            }
        }
    }

    isLogSync(): any {
        console.log(this.authService.isLogSync())
        this.authService.isLogSync()
    }

    getActiveUser() {
        this.activeUser = this.authService.getActiveUser();
    }

    logOut() {
        this.authService.logOut();
        this.alreadyLogged = false;
        this.router.navigate(['/login']);
        console.log('Logout')
    }

    get getUsername() { return this.login.get('username'); }
    get getPassword() { return this.login.get('password'); }

}
