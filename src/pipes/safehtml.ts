import { Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class Safehtml {
    constructor(private sanitizer: DomSanitizer) { }

    transform(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
        // return this.sanitizer.bypassSecurityTrustHtml(style);
        // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
    }
}
