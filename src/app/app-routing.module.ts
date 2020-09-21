import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ***** pages *****
import { MainPageComponent } from './main-page/main-page.component';
import { TokenSaleComponent } from './token-sale/token-sale.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    data: {
      noheader: false,
      nofalse: false,
    },
  },
  {
    path: 'token-sale',
    redirectTo: '',
  },
  {
    path: 'token-sale-1600783200000',
    component: TokenSaleComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
