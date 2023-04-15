import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SharedModule } from '../Shared/SharedModule/shared.module';
import { DialogModule } from '../Shared/Dialogs/dialog.module';

export const LoginRoutingModule: Route[] = [
  {
      path     : '',
      component: LoginComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
    DialogModule,
    RouterModule.forChild(LoginRoutingModule)
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
