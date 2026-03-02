import { Component } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item';

@Component({
  selector: 'app-menu-panel',
  imports: [MenuItem],
  templateUrl: './menu-panel.html',
  styleUrl: './menu-panel.scss',
})
export class MenuPanel {
  protected readonly MENUITEMS = [
    { id: 1, name: 'Главная полка' },
    { id: 2, name: 'Новинки недели' },
    { id: 3, name: 'Бестселлеры' },
  ];
}
