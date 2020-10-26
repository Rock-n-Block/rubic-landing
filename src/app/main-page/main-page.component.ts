import { Component } from '@angular/core';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  public lng: string;
  public onePagerLinks = {
    ko: 'https://drive.google.com/file/d/1ve7XKm7gbK3AuyniNX2TO2JCR8fuXAbe/',
    en: 'https://drive.google.com/file/d/1Ab3DmoM02689MJoItdXlywvTvdtihp5_/view'
  };
  constructor(
      private translate: TranslateService,
      ) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lng = event.lang;
    });
    this.lng = translate.currentLang;
  }
}
