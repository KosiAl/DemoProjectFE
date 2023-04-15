import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../Shared/Services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ListComponent } from '../admin/List/list.component';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthenticationService;
    let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
    const mockRouter = {
        navigate: jasmine.createSpy('navigate'),
      };

    beforeEach(async () => {
        const authSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,  RouterTestingModule.withRoutes(
              [{path: 'admin/list', component: ListComponent}]
            ), ReactiveFormsModule],
            declarations: [LoginComponent],
            providers: [{ provide: AuthenticationService, useValue: authSpy },{ provide: Router, useValue: mockRouter }],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
        authService = TestBed.inject(AuthenticationService);
        authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the loginForm with email and password controls', () => {
        expect(component.loginForm.controls['email'] as FormControl).toBeDefined();
        expect(component.loginForm.controls['password'] as FormControl).toBeDefined();
    });

    it('should initialize the email control with required and email validators', () => {
        const emailControl = component.loginForm.controls['email'] as FormControl;
        expect(emailControl.valid).toBeFalsy();

        emailControl.setValue('');
        expect(emailControl.hasError('required')).toBeTruthy();

        emailControl.setValue('invalidemail');
        expect(emailControl.hasError('email')).toBeTruthy();

        emailControl.setValue('validemail@test.com');
        expect(emailControl.valid).toBeTruthy();
    });

    it('should initialize the password control with required validator', () => {
        const passwordControl = component.loginForm.controls['password'];
        expect(passwordControl.valid).toBeFalsy();

        passwordControl.setValue('');
        expect(passwordControl.hasError('required')).toBeTruthy();

        passwordControl.setValue('password');
        expect(passwordControl.valid).toBeTruthy();
    });

    it('should remove readonly attribute from input element', () => {
        const input = { removeAttribute: jasmine.createSpy('removeAttribute') };
        component.removeReadonly(input as any);
        expect(input.removeAttribute).toHaveBeenCalledWith('readonly');
    });

    it('should call authService login with loginForm value and save token and user in local storage on success, then navigete to admin/list', fakeAsync(() => {
      const mockToken = 'mockToken';
      const mockUser = { id: 1, name: 'Mock User', email: 'test@test.com', password: 'password' };
      const observable = new Observable(subscriber => subscriber.next({ jwt: mockToken, fUser: mockUser }));
      authServiceSpy.login.and.returnValue(observable.pipe(take<any>(1)));
    
      component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
      component.login();
    
      expect(authService.login).toHaveBeenCalledWith(component.loginForm.value);
      tick(100);
    
      expect(localStorage.getItem('token')).toEqual(mockToken);
      expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(mockUser));
    
      tick(2000); // flush the remaining timer for the animateLogin function
    }));

    it('should display a notification with the given message and type', () => {
        component.displayNotification('Test notification', 'Test type');
        expect(component.notification.type).toEqual('Test type');
        expect(component.notification.description).toEqual('Test notification');
        expect(component.notification.timeout).toEqual(3);
        expect(component.notification.shouldOpen).toBeTruthy();
    });

    it('should set animateLoginOut to true and navigate to admin page after 2 seconds', fakeAsync(() => {
        component.animateLogin();
      
        expect(component.animateLoginOut).toBeTruthy();
        tick(2000);
      
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/list']);
      }));
});
