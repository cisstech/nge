import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private overlayRef?: OverlayRef;
  private subscription?: Subscription;

  constructor(private readonly overlay: Overlay) {}

  open<T>(options: IPopupOptions<T>): void {
    const { event, templateRef, containerRef, data } = options;

    this.close();

    let positionStrategy: PositionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    if (event) {
      const { x, y } = event;
      positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo({ x, y })
        .withPositions([
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          },
        ]);
    }

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.attach(
      new TemplatePortal(templateRef, containerRef, {
        $implicit: data || {},
      })
    );

    this.subscription = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((e) => {
          const target = e.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(target)
          );
        }),
        take(1)
      )
      .subscribe(this.close.bind(this));
  }

  close(): void {
    // tslint:disable-next-line: no-unused-expression
    this.subscription && this.subscription.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }
}

export interface IPopupOptions<T> {
  data?: T;
  event?: MouseEvent;
  templateRef: TemplateRef<any>;
  containerRef: ViewContainerRef;
}
