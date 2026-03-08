import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlightText',
})
export class HighlightTextPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any, search: string): SafeHtml {
    if (!search || !value) {
      return value;
    }

    const strValue = value.toString();
    const re = new RegExp(search, 'gi');

    const result = strValue.replace(
      re,
      (match: string) => `<mark class="highlight">${match}</mark>`,
    );
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}
