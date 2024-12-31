import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeSvg',
  pure: true,
  standalone: true,
})
export class SanitizeSvgPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
