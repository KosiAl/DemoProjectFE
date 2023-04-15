import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DialogComponent } from './dialog.component';
import { SharedModule } from 'src/app/Shared/SharedModule/shared.module';



export const DialogRoutingModule: Route[] = [
    {
        path: '',
        component: DialogComponent,
    },
];

@NgModule({
    declarations: [DialogComponent],
    imports: [
        RouterModule.forChild(DialogRoutingModule),
        SharedModule,
    ],
    providers: [],
    bootstrap: [DialogComponent],
})
export class DialogModule {}
