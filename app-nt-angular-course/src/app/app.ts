import { AfterViewInit, Component, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContentPanel } from './layout/main-content-panel/main-content-panel';
import { MenuPanel } from './layout/menu-panel/menu-panel';
import { HeaderPanel } from './layout/header-panel/header-panel';
import { ModalService } from './core/modal-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainContentPanel, MenuPanel, HeaderPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  protected readonly title = signal('app-nt-angular-course');

  @ViewChild('dynamicBookDetails', { read: ViewContainerRef }) dynamicBookDetails!: ViewContainerRef;

  constructor(private modalService: ModalService) {}

  ngAfterViewInit() {
     this.modalService.setViewContainerRef(this.dynamicBookDetails);
  }
}
