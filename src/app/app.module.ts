import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewRecordPageModule } from '../pages/new-record/new-record.module';
import { CryptoListComponent } from '../components/crypto-list/crypto-list';
import { CoinMarketCapProvider } from '../providers/coin-market-cap/coin-market-cap';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CryptoListComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    NewRecordPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CryptoListComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CoinMarketCapProvider
  ]
})
export class AppModule {}
