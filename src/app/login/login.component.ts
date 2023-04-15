import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Shared/Services/auth.service';
import { take } from 'rxjs';
import { ThemeService } from '../Shared/Services/theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    animateLoginOut = false;
    loginForm: FormGroup;
    notification = {
        shouldOpen: false,
        type: 'Warn',
        description: '',
        timeout: 1
    }
    constructor(private router: Router, private fb: FormBuilder, private renderer: Renderer2, private auth: AuthenticationService, private sTheme: ThemeService) {
        // Initialize the login form with form controls and validators
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.sTheme.loadTheme(this.renderer);
    }

    removeReadonly(input: HTMLInputElement) {
        input.removeAttribute('readonly');
    }


    /* This function will be called when the user clicks on the login button
    It will call the login function from the authentication service
    If the login is successful, it will navigate to the admin page and save the token and user in the local storage */
    async login() {
        if (this.loginForm.invalid) return
        this.auth
            .login(this.loginForm.value)
            .pipe(take(1))
            .subscribe({
                next: (result: any) => {
                    this.displayNotification('Login successfull', 'Success');
                    localStorage.setItem('token', result.jwt);
                    localStorage.setItem('currentUser', JSON.stringify(result.fUser));
                    this.animateLogin();
                },
                error: (err: any) => {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('token');
                    this.displayNotification(err.error.error || 'Server offline', 'Error');
                },
            });
    }

    // This function is used to display the notification
    displayNotification(message: string, type: string) {
        this.notification.type = type;
        this.notification.description = message;
        this.notification.timeout = 3;
        this.notification.shouldOpen = true;
    }

    // This function is used to animate new page when user successfully logs in
    animateLogin() {
        this.animateLoginOut = true;
        setTimeout(() => {
            this.router.navigate(['/admin/list']);
        }, 2000);
    }

    
}
