import { Component, OnInit } from '@angular/core';
import { ActivationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mywish-swaps';

  public hideInstructionLink;
  public visibleWatchButton;
  public notCookiesAccept: boolean;
  public withHeader: boolean;
  public withFooter: boolean;

  constructor(protected router: Router) {
    const body = document.getElementsByTagName('body')[0];
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
      }

      if (event instanceof ActivationEnd) {
        this.withHeader = !event.snapshot.data.noheader;
        this.withFooter = !event.snapshot.data.nofooter;

        if (!event.snapshot.firstChild) {
          if (event.snapshot.data.support) {
            this.hideInstructionLink = event.snapshot.data.supportHide;
            this.visibleWatchButton = !event.snapshot.data.hideInstruction;
            body.classList.add('with-support');
            body.classList.remove('without-support');
            event.snapshot.data.supportHide
              ? body.classList.add(
                  'support-hide-' + event.snapshot.data.supportHide
                )
              : '';
          } else {
            body.classList.remove('with-support');
            body.classList.add('without-support');
            this.visibleWatchButton = false;
          }
        }
      }
    });
  }

  private checkLiveChat() {
    const liveChatButtonFrame = document.getElementById(
      'livechat-compact-view'
    );
    const liveChatContainer = document.getElementById(
      'livechat-compact-container'
    );

    if (!liveChatButtonFrame) {
      setTimeout(() => {
        this.checkLiveChat();
      });
      return;
    }

    const mutationObserver = new window['MutationObserver'](() => {
      liveChatContainer.removeAttribute('style');
    });
    mutationObserver.observe(liveChatContainer, {
      attributes: true,
      attributeFilter: ['style'],
    });
    liveChatContainer.removeAttribute('style');

    const frameContent =
      liveChatButtonFrame['contentWindow'] ||
      liveChatButtonFrame['contentDocument'];
    const frameContentContainer = frameContent.document.getElementById(
      'content-container'
    );

    frameContentContainer.setAttribute('style', 'padding: 0 !important');

    frameContent.document.getElementById('full-view-button').style.height =
      '100%';
  }

  ngOnInit(): void {}
}
