import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'nge-doc-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
    private subscription?: Subscription;
    sidebarOpened = true;
    showTableOfContents = true;

    constructor(
        private readonly observer: BreakpointObserver,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
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
            this.changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
