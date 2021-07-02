import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nge-doc-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
    private subscription?: Subscription;
    sidebarOpened = true;
    showTableOfContents = true;

    constructor(
        private readonly observer: BreakpointObserver
    ) {}

    ngOnInit() {
         this.observer.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
        ]).subscribe(result => {
            this.sidebarOpened = true;
            this.showTableOfContents = true;
            if (result.matches) {
                this.sidebarOpened = false;
                this.showTableOfContents = false;
            }
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
