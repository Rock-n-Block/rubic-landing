import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-header-main-page',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderMainPageComponent implements OnInit {
  public pageScrolled: boolean;

  public openedMenu;
  public infoMenuOpened;
  public devMenuOpened;
  public productMenuOpened;
  public openedLngList: boolean;
  private translator: TranslateService;
  public languagesList: { lng: string; title: string; active?: boolean }[];
  public currLanguage: string;

  @ViewChild('logoutConfirmation') logoutConfirmation: TemplateRef<any>;
  @ViewChild('headerPage') headerPage;

  @Output() changedSocialState = new EventEmitter<string>();

  constructor(
      private router: Router,
      private translate: TranslateService,
      private cookieService: CookieService
  ) {
    this.translator = translate;
    this.languagesList = [
      {
        lng: "en",
        title: "English",
      },
      {
        lng: "ko",
        title: "한국어",
      },
    ];

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setActiveLanguage(event);
    });
    this.setActiveLanguage({
      lang: translate.currentLang,
    });

    document
      .getElementsByTagName('body')[0]
      ['addEventListener']('mousedown', () => {
        this.openedMenu = false;
        this.infoMenuOpened = false;
        this.productMenuOpened = false;
        this.devMenuOpened = false;
      });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.openedMenu = false;
        this.infoMenuOpened = false;
        this.productMenuOpened = false;
        this.devMenuOpened = false;
      }
    });
  }

  private setActiveLanguage(event) {
    if (this.currLanguage) {
      this.languagesList.filter((lang) => {
        return lang["lng"] === this.currLanguage;
      })[0].active = false;
    }
    this.currLanguage = event.lang;
    this.cookieService.set("lng", this.currLanguage, null, null, null, null, null);

    this.languagesList.filter((lang) => {
      return lang["lng"] === this.currLanguage;
    })[0].active = true;
    this.languagesList.sort((a, b) => {
      return b.active ? 1 : -1;
    });
  }

  public toggleLanguage() {
    this.openedLngList = !this.openedLngList;
  }

  public setLanguage(lng) {
    this.translator.use(lng);
  }


  ngOnInit() {}
}
