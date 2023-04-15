import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PageLoaderComponent } from '../Shared/Components/PageLoader/page-loader.component';
import { ThemeService } from '../Shared/Services/theme.service';
import { SharedModule } from '../Shared/SharedModule/shared.module';
import { LightDarkToggleComponent } from '../Shared/Components/lightDarkToggle/lightDarkToggle.component';
import { HttpInterceptorService } from '../Shared/Services/http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    declarations: [AdminComponent, PageLoaderComponent, LightDarkToggleComponent],
    imports: [RouterModule, SharedModule],
    providers: [ThemeService,{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
    bootstrap: [AdminComponent],
})
export class AdminModule {}
