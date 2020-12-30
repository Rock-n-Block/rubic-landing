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
    ko: '/assets/pdf/OnePage.pdf',
    en: '/assets/pdf/OnePage.pdf'
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
