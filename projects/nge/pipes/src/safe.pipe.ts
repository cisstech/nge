import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  constructor(private readonly sanitiner: DomSanitizer) {}

  transform(
    input: string | null,
    type: 'url' | 'html' | 'style' | 'script' | 'resource'
  ): any {
    if (!input) return input;
    switch (type) {
      case 'url':
        return this.sanitiner.bypassSecurityTrustUrl(input);
      case 'html':
        return this.sanitiner.bypassSecurityTrustHtml(input);
      case 'style':
        return this.sanitiner.bypassSecurityTrustStyle(input);
      case 'script':
        return this.sanitiner.bypassSecurityTrustScript(input);
      case 'resource':
        return this.sanitiner.bypassSecurityTrustResourceUrl(input);
      default:
        throw new Error('Unknown type: ' + type);
    }
  }
}

@NgModule({
  declarations: [SafePipe],
  exports: [SafePipe],
})
export class SafePipeModule {}
