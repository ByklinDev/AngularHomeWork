import { Component, input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  imports: [],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss',
})
export class MenuItem {
  caption = input();
  clickLog(): void {
    console.log(this.caption()! + ` ` + new Date().toLocaleTimeString());
  }
}
