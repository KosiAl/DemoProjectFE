
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ListComponent } from './list.component';
import { SharedModule } from 'src/app/Shared/SharedModule/shared.module';
export const ListRoutingModule: Route[] = [
    {
        path: '',
        component: ListComponent,
    },
];

@NgModule({
    declarations: [ListComponent],
    imports: [RouterModule.forChild(ListRoutingModule), SharedModule],
    providers: [],
    bootstrap: [ListComponent],
})
export class ListModule {}
