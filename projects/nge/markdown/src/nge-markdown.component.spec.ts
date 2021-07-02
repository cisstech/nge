import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgeMarkdownComponent } from './nge-markdown.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NgeMarkdownComponent', () => {
    let component: NgeMarkdownComponent;
    let fixture: ComponentFixture<NgeMarkdownComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NgeMarkdownComponent],
            providers: [],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(NgeMarkdownComponent);
        component = fixture.componentInstance;
    });

    it('should create instance', () => {
        expect(component).toBeDefined();
    });
});
