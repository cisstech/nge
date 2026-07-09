import { Location } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { CompilerService } from '@cisstech/nge/services'
import { Subject } from 'rxjs'
import { NGE_DOC_RENDERERS } from '../nge-doc'
import { NgeDocService } from '../nge-doc.service'
import { NgeDocRendererComponent } from './renderer.component'

// Regression guard: authored Markdown links are plain anchors. Left to the
// browser they do a full-page load to an absolute path that ignores the
// deployed base href (so `/nge/` is dropped on GitHub Pages). The renderer must
// intercept internal links and route them through the Angular router instead.
describe('NgeDocRendererComponent link handling', () => {
  let fixture: ComponentFixture<NgeDocRendererComponent>
  let host: HTMLElement
  let router: { navigateByUrl: jest.Mock }

  beforeEach(() => {
    router = { navigateByUrl: jest.fn() }
    TestBed.configureTestingModule({
      imports: [NgeDocRendererComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: { snapshot: { fragment: null } } },
        { provide: Location, useValue: { normalize: (url: string) => url, path: () => '/docs/current' } },
        { provide: NgeDocService, useValue: { stateChanges: new Subject(), currLink: () => null, setSeo: jest.fn() } },
        { provide: CompilerService, useValue: { render: jest.fn() } },
        { provide: NGE_DOC_RENDERERS, useValue: { markdown: { component: () => Promise.resolve(class {}) } } },
      ],
    })
    fixture = TestBed.createComponent(NgeDocRendererComponent)
    fixture.detectChanges()
    host = fixture.nativeElement as HTMLElement
  })

  function clickAnchor(attributes: Record<string, string>, init: MouseEventInit = {}): MouseEvent {
    const anchor = document.createElement('a')
    Object.entries(attributes).forEach(([key, value]) => anchor.setAttribute(key, value))
    anchor.textContent = 'link'
    host.appendChild(anchor)
    const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...init })
    anchor.dispatchEvent(event)
    return event
  }

  it('routes an internal link through the router and cancels the navigation', () => {
    const event = clickAnchor({ href: '/docs/nge-markdown/installation' })
    expect(router.navigateByUrl).toHaveBeenCalledWith('/docs/nge-markdown/installation')
    expect(event.defaultPrevented).toBe(true)
  })

  it('leaves links to another origin to the browser', () => {
    const event = clickAnchor({ href: 'https://example.com/docs/x' })
    expect(router.navigateByUrl).not.toHaveBeenCalled()
    expect(event.defaultPrevented).toBe(false)
  })

  it('leaves modified clicks alone so the browser can open a new tab', () => {
    const event = clickAnchor({ href: '/docs/x' }, { metaKey: true })
    expect(router.navigateByUrl).not.toHaveBeenCalled()
    expect(event.defaultPrevented).toBe(false)
  })

  it('respects links that opt out of internal routing with a target', () => {
    const event = clickAnchor({ href: '/docs/x', target: '_blank' })
    expect(router.navigateByUrl).not.toHaveBeenCalled()
    expect(event.defaultPrevented).toBe(false)
  })
})
