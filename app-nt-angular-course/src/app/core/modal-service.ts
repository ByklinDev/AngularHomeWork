import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ModalWrapper } from '../shared/modal-wrapper/modal-wrapper';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private viewContainerRef?: ViewContainerRef;

  setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  openViewContainerRef(component: any, data: any): void {
    if (!this.viewContainerRef) {
      return;
    }

    this.viewContainerRef.clear();

    const wrapperRef = this.viewContainerRef.createComponent(ModalWrapper);
    wrapperRef.changeDetectorRef.detectChanges();

    const contentHost = wrapperRef.instance.contentHost;

    if (!contentHost) {
      return;
    }

    const contentRef: ComponentRef<any> = contentHost.createComponent(component);

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        contentRef.setInput(key, data[key]);
      }
    }

    contentRef.instance.close?.subscribe(() => this.close());
    wrapperRef.instance.close.subscribe(() => this.close());

    contentRef.changeDetectorRef.detectChanges();
  }

  close(): void {
    this.viewContainerRef?.clear();
  }
}
