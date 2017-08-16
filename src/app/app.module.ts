import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgClass } from '@angular/common';

import { AppComponent } from './app.component';
import { CryptoCurrencyComponent } from './crypto-currency/crypto-currency.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptoCurrencyComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
