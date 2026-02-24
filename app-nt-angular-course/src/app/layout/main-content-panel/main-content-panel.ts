import { Component } from '@angular/core';

@Component({
  selector: 'app-main-content-panel',
  imports: [],
  templateUrl: './main-content-panel.html',
  styleUrl: './main-content-panel.scss',
})
export class MainContentPanel {
  itemsCount = 120;

  get fakeItems() {
    return Array(this.itemsCount);
  }
}
