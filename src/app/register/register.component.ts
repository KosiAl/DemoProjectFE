import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthenticationService } from '../Shared/Services/auth.service';
import { take } from 'rxjs';
import { ThemeService } from '../Shared/Services/theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    notification = {
        shouldOpen: false,
        type: 'Warn',
        description: '',
        timeout: 1
    }

    constructor(private auth: AuthenticationService, private fb: FormBuilder, private sTheme: ThemeService, private renderer: Renderer2) {
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.sTheme.loadTheme(this.renderer);
    }

    removeReadonly(input: HTMLInputElement) {
        input.removeAttribute('readonly');
    }

    // This function registers the user and displays a notification
    async register() {
        if (this.registerForm.invalid) return
        this.auth
            .register(this.registerForm.value)
            .pipe(take(1))
            .subscribe({
                next: (result: any) => {
                    this.displayNotification('User registered successfully', 'Success');
                },
                error: (err: any) => {
                    this.displayNotification('Server offline', 'Error');
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

}
