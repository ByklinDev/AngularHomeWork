import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightCard]',
  standalone: true,
})
export class HighlightCardDirective {
  @Input() defaultColor: string | null = null;
  @Input() highlightColor: string = '#8a5b73';

  private isHighlighted: boolean = false;

  @HostBinding('style.backgroundColor') backgroundColor: string | null = null;
  @HostBinding('style.transition') transition: string = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';

  @HostBinding('style.transform') get transform() {
    return this.isHighlighted ? 'translateY(-6px)' : 'translateY(0)';
  }
  @HostBinding('style.cursor') cursor = 'pointer';

  constructor() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.isHighlighted = true;
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHighlighted = false;
    this.backgroundColor = this.defaultColor;
  }
}
