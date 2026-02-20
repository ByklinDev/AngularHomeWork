import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContentPanel } from './layout/main-content-panel/main-content-panel';
import { MenuPanel } from './layout/menu-panel/menu-panel';
import { HeaderPanel } from './layout/header-panel/header-panel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainContentPanel, MenuPanel, HeaderPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('app-nt-angular-course');
}
