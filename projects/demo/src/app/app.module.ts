// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// LIBS
import { NgeMonacoColorizerService, NgeMonacoModule, NGE_MONACO_THEMES } from 'nge/monaco';
import {
    NgeMarkdownModule,
    NgeMarkdownTabbedSetProvider,
    NgeMarkdownAdmonitionsProvider,
    NgeMarkdownLinkAnchorProvider,
    NgeMarkdownKatexProvider,
    NgeMarkdownEmojiProvider,
    NgeMarkdownIconsProvider,
    NgeMarkdownHighlighterProvider,
    NgeMarkdownHighlighterMonacoProvider,
} from 'nge/markdown';

// MODULE
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,

        NgeMarkdownModule,
        NgeMonacoModule.forRoot({
            locale: 'fr',
            theming: {
                themes: NGE_MONACO_THEMES.map(theme => 'assets/nge/monaco/themes/' + theme),
                default: 'github'
            }
        }),

        AppRoutingModule,
        BrowserAnimationsModule,
    ],
    providers: [

        NgeMarkdownKatexProvider,
        NgeMarkdownIconsProvider,
        NgeMarkdownEmojiProvider,
        NgeMarkdownTabbedSetProvider,
        NgeMarkdownLinkAnchorProvider,
        NgeMarkdownAdmonitionsProvider,
        NgeMarkdownHighlighterProvider,
        NgeMarkdownHighlighterMonacoProvider(NgeMonacoColorizerService),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
