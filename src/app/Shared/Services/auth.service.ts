import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    /* backend_url = window.location.origin + "/api/v1" */
    backend_url = 'http://localhost:3000/api/v1';

    constructor(private http: HttpClient) {

    }

    register(registerForm: any) {
        return this.http.post(`${this.backend_url}/register`, registerForm)
    }

    login(loginForm: any) {
        return this.http.post(`${this.backend_url}/login`, loginForm)

    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }
    
    touch() {
        let url = 'http://localhost:3000/';
        return firstValueFrom(this.http.get(url));
    }

}
