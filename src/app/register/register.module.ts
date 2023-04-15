import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../Shared/SharedModule/shared.module';
import { DialogModule } from '../Shared/Dialogs/dialog.module';

export const RegisterRoutingModule: Route[] = [
  {
      path     : '',
      component: RegisterComponent
  }
];

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    SharedModule,
    DialogModule,
    RouterModule.forChild(RegisterRoutingModule)
  ],
  providers: [],
  bootstrap: [RegisterComponent]
})
export class RegisterModule { }
