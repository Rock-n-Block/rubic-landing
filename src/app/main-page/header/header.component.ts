import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

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

  @ViewChild('logoutConfirmation') logoutConfirmation: TemplateRef<any>;
  @ViewChild('headerPage') headerPage;

  @Output() changedSocialState = new EventEmitter<string>();

  constructor(private router: Router) {
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

  ngOnInit() {}
}
