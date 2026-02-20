import { Component } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item';

@Component({
  selector: 'app-menu-panel',
  imports: [MenuItem],
  templateUrl: './menu-panel.html',
  styleUrl: './menu-panel.scss',
})
export class MenuPanel {
  protected readonly menuitems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];
}
