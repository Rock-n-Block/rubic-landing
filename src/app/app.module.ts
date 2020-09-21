import { NgModule } from '@angular/core';
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
