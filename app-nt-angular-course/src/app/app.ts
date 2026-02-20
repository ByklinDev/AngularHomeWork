import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContentPanel } from './layout/main-content-panel/main-content-panel';
import { AppMenuPanel } from "./layout/app-menu-panel/app-menu-panel";
import { AppHeaderPanel } from "./layout/app-header-panel/app-header-panel";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainContentPanel, AppMenuPanel, AppHeaderPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('app-nt-angular-course');
}
