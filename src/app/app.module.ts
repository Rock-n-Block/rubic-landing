import { APP_INITIALIZER, NgModule, Injector } from '@angular/core';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MainPageComponent } from './main-page/main-page.component';
import { HeaderMainPageComponent } from './main-page/header/header.component';
import { FooterMainPageComponent } from './main-page/footer/footer.component';
import { TokenSaleComponent } from './token-sale/token-sale.component';

import { CountdownComponent } from './components/countdown/countdown.component';
import { MatDialogModule } from '@angular/material';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import {TransferHttpCacheModule} from "@nguniversal/common";
import {CookieService} from "ngx-cookie-service";


export class TranslateBrowserLoader implements TranslateLoader {

  constructor(private prefix: string = 'i18n',
              private suffix: string = '.json',
              private transferState: TransferState,
              private http: HttpClient) {

  }

  public getTranslation(lang: string): Observable<any> {

    const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
    const data = this.transferState.get(key, null);

    // First we are looking for the translations in transfer-state, if none found, http load as fallback
    if (data) {
      return Observable.create(observer => {
        observer.next(data);
        observer.complete();
      });
    } else {
      return new TranslateHttpLoader(this.http, this.prefix, this.suffix).getTranslation(lang);
    }
  }
}

export function exportTranslateStaticLoader(http: HttpClient, transferState: TransferState) {
  return new TranslateBrowserLoader('./assets/i18n/', '.json?_t=' + (new Date).getTime(), transferState, http);
}



export function appInitializerFactory(translate: TranslateService, cookieService: CookieService) {

  const defaultLng = (navigator.language || navigator['browserLanguage']).split('-')[0];

  const langToSet = cookieService.get('lng') || ((['en', 'ko'].indexOf(defaultLng) > -1) ? defaultLng : 'en');

  return () => new Promise<any>((resolve: any, reject) => {

    translate.setDefaultLang('en');

    translate.use(langToSet).subscribe(() => {
      resolve(null);
    });

  });
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TokenSaleComponent,

    FooterMainPageComponent,
    HeaderMainPageComponent,

    CountdownComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    ClipboardModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    TransferHttpCacheModule,
    TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: exportTranslateStaticLoader,
            deps: [HttpClient, TransferState]
          }
        }
    ),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, CookieService],
      multi: true,
    },
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
