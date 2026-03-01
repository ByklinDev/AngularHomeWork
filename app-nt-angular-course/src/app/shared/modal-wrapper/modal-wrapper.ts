import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  imports: [],
  templateUrl: './modal-wrapper.html',
  styleUrl: './modal-wrapper.scss',
})
export class ModalWrapper {
  @ViewChild('contentHost', { read: ViewContainerRef }) contentHost!: ViewContainerRef;

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
  @HostListener('window:keydown.escape')
  handleKeyDown() {
    this.onClose();
  }
}
