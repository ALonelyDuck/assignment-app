import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private authService: AuthService, private router: Router) { }

    login = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    isLogFailed = false;
    getErrorLoggin = 'Incorrect username or password';

    ngOnInit(): void { }

    onLogin() {
        if (this.login.valid) {
            const username = this.login.value.username;
            const password = this.login.value.password;

            if (this.authService.logIn(username || '', password || '')) {
                console.log('Login successful')
                this.router.navigate(['/home']);
            } else {
                this.isLogFailed = true;
                console.log('Login failed')
            }
        }
    }

    logOut() {
        this.authService.logOut();
        this.router.navigate(['/home']);
        console.log('Logout')
    }

    get getUsername() { return this.login.get('username'); }
    get getPassword() { return this.login.get('password'); }

}
