import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../Shared/SharedModule/shared.module';

export const HomeRoutingModule: Route[] = [
  {
      path     : '',
      component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(HomeRoutingModule)
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
