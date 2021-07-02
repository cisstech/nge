// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// LIBS
import { NgeMonacoModule, NGE_MONACO_THEMES } from 'nge/monaco';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
