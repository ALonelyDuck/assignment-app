import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './assignments/shared/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Assignment App';
    opened = false;

    constructor(private router: Router, private authService: AuthService) { }

    isLog() {
        // console.log(this.authService.isLogSync());
        return this.authService.isLogSync();
    }

    // login() {
    //     if (!this.authService.loggedIn) {
    //         this.authService.logIn();
    //     } else {
    //         this.authService.logOut();
    //         this.router.navigate(['/home']);
    //     }
    // }
}
