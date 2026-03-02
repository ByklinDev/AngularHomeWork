import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfHighRating]',
})
export class HighRatingBookDirective {
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  constructor() {
    console.log('HighRatingBookDirective created');
  }
  private hasView = false;
  @Input() set appIfHighRating(rating: number) {
    console.log('HighRatingBookDirective rating:', rating);
    if (rating > 4 && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
      console.log('HighRatingBookDirective view created');
    } else if (rating <= 4 || this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
      console.log('HighRatingBookDirective view removed');
    }
  }
}
