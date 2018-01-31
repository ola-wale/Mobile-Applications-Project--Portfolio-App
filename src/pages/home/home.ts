import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewRecordPage } from '../new-record/new-record';
import { Storage } from '@ionic/storage';
import { CoinMarketCapProvider } from '../../providers/coin-market-cap/coin-market-cap';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  records = [];
  coins;
  total: number;
  loading = true;
  constructor(private platform:Platform,private alertCtrl: AlertController, public cmc: CoinMarketCapProvider, private storage: Storage, public navCtrl: NavController) {
  }

  ionViewDidEnter() {
    this.loadRecords(null);
  }

  loadRecords(refresher) {
    this.records = [];
    this.cmc.getCoins().subscribe(coins => {
      this.coins = coins;
      return this.storage.get('records').then(val => {
        for (var i in val) {
          this.records.push(JSON.parse(val[i]));
        }
        if (refresher) {
          refresher.complete();
        }
        this.loading = false;
      })
    }, error => {
      this.alertCtrl.create({
        title: 'Error fetching coins',
        message: 'Ensure you have a working internet connection before trying again.',
        buttons: [
          {
            text: 'Ok',
            handler: () => { this.platform.exitApp(); }
          }
        ]
      }).present();
    });
  }


  totalValue(): number {
    this.total = 0;
    for (var i in this.records) {
      this.total += this.records[i].quantity * this.findCoinData(this.records[i].coin).price_usd;
    }
    return this.total;
  }

  findCoinData(ticker: string) {
    for (var i in this.coins) {
      if (this.coins[i]['symbol'] == ticker) {
        return this.coins[i];
      }
    }
  }

  public openNewRecordPage() {
    this.navCtrl.push(NewRecordPage);
  }

  doRefresh(refresher) {
    this.loadRecords(refresher);
  }

}
