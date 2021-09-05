import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    this.linkTheme?.setAttribute(
      'href',
      localStorage.getItem('theme') ?? './assets/css/colors/default-dark.css'
    );
  }
  changeTheme(theme: string): void {
    const url = `/assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href', url);

    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    const links = document.querySelectorAll('.selector');
    links.forEach((elem) => {
      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');
      if (
        `/assets/css/colors/${btnTheme}.css` ===
        this.linkTheme?.getAttribute('href')
      ) {
        elem.classList.add('working');
      }
    });
  }
}
