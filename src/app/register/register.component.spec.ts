import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { AuthenticationService } from '../Shared/Services/auth.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, catchError, of, switchMap, take, throwError } from 'rxjs';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('AuthenticationService', ['register']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
            declarations: [RegisterComponent],
            providers: [FormBuilder, { provide: AuthenticationService, useValue: spy }],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
        authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should register user successfully when form is valid', () => {
      const registerButton = fixture.nativeElement.querySelector('button');
      const response = { success: true };
      authServiceSpy.register.and.returnValue(of(response));
      component.registerForm.setValue({
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123',
      });
      fixture.detectChanges(); // trigger change detection to update form values
      registerButton.click();
  
      expect(authServiceSpy.register).toHaveBeenCalledWith(component.registerForm.value);
      expect(component.notification.shouldOpen).toBeTrue();
      expect(component.notification.type).toBe('Success');
      expect(component.notification.description).toBe('User registered successfully');
      expect(component.notification.timeout).toBe(3);
    });

    it('should not register user and display error message when form is invalid', () => {
        const registerButton = fixture.nativeElement.querySelector('button');
        component.registerForm.setValue({
            name: '',
            email: '',
            password: '',
        });
        registerButton.click();
        expect(authServiceSpy.register).not.toHaveBeenCalled();
        expect(component.notification.shouldOpen).toBeFalse();
    });

    it('should display error message when server is offline', () => {

      const registerButton = fixture.nativeElement.querySelector('button');
        
      authServiceSpy.register.and.returnValue(throwError(() => new Error('Server offline')));

      component.registerForm.setValue({
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123',
      });
      fixture.detectChanges(); // trigger change detection to update form values
      registerButton.click();
      expect(authServiceSpy.register).toHaveBeenCalledWith(component.registerForm.value);
      expect(component.notification.shouldOpen).toBeTrue();
      expect(component.notification.type).toBe('Error');
      expect(component.notification.description).toBe('Server offline');
      expect(component.notification.timeout).toBe(3);
    });
});
