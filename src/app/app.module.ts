import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExtraOptions, RouterModule } from '@angular/router';
import { SharedModule } from './Shared/SharedModule/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './Store/reducer';

const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        StoreModule.forRoot({ book: appReducer }),
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [HttpClient],
    bootstrap: [AppComponent],
})
export class AppModule {}
