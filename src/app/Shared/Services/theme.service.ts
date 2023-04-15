import { Injectable } from '@angular/core';
import { colorList } from '../../Shared/colors';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    colorList = colorList;

    loadTheme(dom:any) {
        let theme = localStorage.getItem('theme');
        if (theme) {
            this.changeTheme(theme,dom);
        } else {
            this.changeTheme('theme-blue',dom);
        }

        let isDark = localStorage.getItem('dark');
        if (isDark) {
            if (isDark === 'true') {
                this.setDarkTheme(dom);
            } else {
                this.setLightTheme(dom);
            }
        } else {
            this.setLightTheme(dom);
        }
    }

    setLightTheme(dom:any) {
        dom.removeClass(document.body, 'dark');
        dom.removeClass(document.body, 'bgDark');
        dom.addClass(document.body, 'bgLight');
        localStorage.setItem('dark', 'false');
    }
    setDarkTheme(dom:any) {
        dom.removeClass(document.body, 'bgLight');
        dom.addClass(document.body, 'dark');
        dom.addClass(document.body, 'bgDark');
        localStorage.setItem('dark', 'true');
    }

    changeTheme(upcomingTheme: string,dom:any) {
        const body = document.getElementsByTagName('body')[0].classList;
        const currentTheme = Array.from(body).find((item) => item.startsWith('theme-')) || 'theme-blue';

        dom.removeClass(document.body, currentTheme);
        dom.addClass(document.body, upcomingTheme);

        /* SAVE CURRENT THEME TO BROWSER */
        localStorage.setItem('theme', upcomingTheme);
    }

    getCurrentThemeColor(currentTheme: string) {
        let colorName = currentTheme.split('theme-')[1];
        let color = this.colorList.find((color) => color.name === colorName);
        let currentColor = color?.class ? color.shades[4].color : '#3b82f6';
        return currentColor;
    }
}
