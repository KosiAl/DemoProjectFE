import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { ThemeService } from '../Shared/Services/theme.service';
import { AuthenticationService } from '../Shared/Services/auth.service';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
    routerSubscription: any;
    username = '';
    darkMode = false;
    currentTheme = 'theme-blue';
    sidebarOpen = false;
    isPageLoading = false;

    constructor(public router: Router, private renderer: Renderer2, private sTheme: ThemeService, private auth: AuthenticationService) {
        this.darkMode = localStorage.getItem('dark') === 'true' ? true : false;
        this.currentTheme = localStorage.getItem('theme') || 'theme-blue';
        this.username = JSON.parse(localStorage.getItem('currentUser') || '{"name": ""}').name|| '';
    }

    // This function is used to get all the books from the API and sync the selected books with the store
    ngOnInit(): void {
        // routerSubscription is used to show the page loader
        this.routerSubscription = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.isPageLoading = true;
            }

            if (event instanceof NavigationEnd) {
                this.isPageLoading = false;
            }
        });
        // This part is used to set the theme font,color and dark or light theme on page load
        this.renderer.addClass(document.body, 'font-nice');
        this.sTheme.loadTheme(this.renderer);
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }

    toggleOffCanvasMenu() {
        this.sidebarOpen = !this.sidebarOpen;
    }

    toggleDarkMode() {
        if (this.darkMode === false) {
            this.sTheme.setDarkTheme(this.renderer);
        } else {
            this.sTheme.setLightTheme(this.renderer);
        }
        this.darkMode = !this.darkMode;
    }

    changeTheme(theme: string) {
        this.sTheme.changeTheme(theme, this.renderer);
        this.currentTheme = theme;
    }
}
