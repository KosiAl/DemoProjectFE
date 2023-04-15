import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FavoritesComponent } from './favorites.component';

import { SharedModule } from 'src/app/Shared/SharedModule/shared.module';

export const ProductsRoutingModule: Route[] = [
    {
        path: '',
        component: FavoritesComponent,
    },
];

@NgModule({
    declarations: [FavoritesComponent],
    imports: [
        RouterModule.forChild(ProductsRoutingModule),
        SharedModule,
    ],
    providers: [],
    bootstrap: [FavoritesComponent],
})
export class FavoritesModule {}
