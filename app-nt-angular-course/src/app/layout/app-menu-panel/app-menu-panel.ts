import { Component } from '@angular/core';
import { AppMenuItem } from '../app-menu-item/app-menu-item';

@Component({
  selector: 'app-app-menu-panel',
  imports: [AppMenuItem],
  templateUrl: './app-menu-panel.html',
  styleUrl: './app-menu-panel.scss',
})
export class AppMenuPanel {
  menuitems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];
}
