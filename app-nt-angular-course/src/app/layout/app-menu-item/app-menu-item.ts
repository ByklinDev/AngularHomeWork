import { Component, input } from '@angular/core';

@Component({
  selector: 'app-app-menu-item',
  imports: [],
  templateUrl: './app-menu-item.html',
  styleUrl: './app-menu-item.scss',
})
export class AppMenuItem {
  caption = input();
  clickLog(): void {
    console.log(this.caption()! + ` ` + new Date().toLocaleTimeString());
  }
}
