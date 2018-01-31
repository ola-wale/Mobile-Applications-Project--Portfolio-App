import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CoinMarketCapProvider } from '../../providers/coin-market-cap/coin-market-cap';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
/**
 * Generated class for the NewRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-record',
  templateUrl: 'new-record.html',
})
export class NewRecordPage {
  coins;
  form = {};
  records = [];
  loading = true;
  constructor(private storage: Storage, private alertCtrl: AlertController, public cmc: CoinMarketCapProvider, public navCtrl: NavController, public navParams: NavParams) {
    storage.get('records').then((val) => {
      if (val) {
        this.records = val;
        console.log(val);
      }
    });
  }

  ionViewDidLoad() {
    this.cmc.getCoins().subscribe(coins => {
      this.coins = coins;
      this.loading = false;
    },error => {
      this.alertCtrl.create({
        title: 'Error fetching coins',
        message: 'Ensure you have a working internet connection before trying again.',
        buttons: [
          {
            text: 'Ok',
            handler: () => { this.navCtrl.pop(); }
          }
        ]
      }).present();
    })
  }

  setCurrentPrice() {
    let coin = this.form['coin'];
    if (!coin) {
      this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Select a coin first.',
        buttons: ['Ok']
      }).present();
      return;
    }

    for (var i in this.coins) {
      var c = this.coins[i];
      if (c.symbol == coin) {
        this.form['price'] = c.price_usd;
        return;
      }
    }
  }

  saveRecord(e,fForm:NgForm) {
    if (this.form['price'] && this.form['coin'] && this.form['quantity']) {
      this.form['id'] = '_' + Math.random().toString(36).substr(2, 9);
      this.records.push(JSON.stringify(this.form));
      if (this.storage.set('records', this.records)) {
        this.alertCtrl.create({
          title: 'Success',
          message: 'This record been added successfully to your portfolio',
          buttons: [
            {
              text: 'Add new record',
              handler: () => { fForm.resetForm(); }
            },
            {
              text: 'View your portfolio',
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        }).present();
      }
    } else {
      this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Fill all fields.',
        buttons: ['Ok']
      }).present();
    }
    e.preventDefault();
    return false;
  }

}
