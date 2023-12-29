import { Component, HostBinding } from '@angular/core';

import { darkTheme, lightTheme } from '../../app/theme';

enum ThemeVariant {
  DARK = 'dark',
  LIGHT = 'light',
}

@Component({
  selector: 'theme-provider',
  standalone: true,
  template: `
    <button (click)="toggleTheme()" class="theme-switcher">
      {{ themeSwitcherDisplayValue[toggleThemeText] }}
    </button>
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host[data-theme='dark'] {
        --text-color: rgb(${darkTheme.text});
        --accent-color: rgb(${darkTheme.accent});
        --border-color: rgba(${darkTheme.border}, 0.3);
        --background-color: rgb(${darkTheme.background});
        --background-alternative-color: rgb(${darkTheme.backgroundAlternative});
        --background-highlight-color: rgb(${darkTheme.backgroundHighlight});
        --shadow-color: rgba(${darkTheme.shadow}, 0.1);
      }
      :host[data-theme='light'] {
        --text-color: rgb(${lightTheme.text});
        --accent-color: rgb(${lightTheme.accent});
        --border-color: rgba(${lightTheme.border}, 0.3);
        --background-color: rgb(${lightTheme.background});
        --background-alternative-color: rgb(
          ${lightTheme.backgroundAlternative}
        );
        --background-highlight-color: rgb(${lightTheme.backgroundHighlight});
        --shadow-color: rgba(${lightTheme.shadow}, 0.1);
      }

      :host {
        display: block;
        color: var(--text-color);
        background-color: var(--background-color);

        transition-property: background-color, color;
        transition-duration: var(--transition-duration);
        transition-timing-function: var(--transition-function);

        --transition-duration: 0.25s;
        --transition-function: ease-out;
      }
    `,
    `
      .theme-switcher {
        position: fixed;
        z-index: 100;
        top: 0.5rem;
        right: 0.5rem;

        cursor: pointer;

        border: 1px solid var(--border-color);
        border-radius: 50%;
        color: var(--text-color);
        background-color: var(--background-alternative-color);

        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.25rem;

        transition-property: background-color, border-color;
        transition-duration: var(--transition-duration);
        transition-timing-function: var(--transition-function);
      }

      .theme-switcher:hover {
        border-color: var(--accent-color);
        background-color: var(--background-highlight-color);
      }
    `,
  ],
})
export class ThemeProviderComponent {
  @HostBinding('attr.data-theme') activeTheme: ThemeVariant =
    ThemeVariant.LIGHT;

  themeSwitcherDisplayValue: Record<ThemeVariant, string> = {
    [ThemeVariant.LIGHT]: '🌓',
    [ThemeVariant.DARK]: '☀️',
  };

  toggleTheme() {
    this.activeTheme =
      this.activeTheme === ThemeVariant.LIGHT
        ? ThemeVariant.DARK
        : ThemeVariant.LIGHT;
  }

  get toggleThemeText() {
    return this.activeTheme;
  }
}
