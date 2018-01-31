import { Component, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CryptoListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'crypto-list',
  templateUrl: 'crypto-list.html'
})
export class CryptoListComponent implements AfterViewInit {
  @Input('records') records;
  @Input('coins') coins;
  @Output() refresh = new EventEmitter<string>();
  constructor(private alertCtrl: AlertController,private storage:Storage) { }

  ngAfterViewInit() { }

  findCoinData(ticker: string) {
    for (var i in this.coins) {
      if (this.coins[i]['symbol'] == ticker) {
        return this.coins[i];
      }
    }
  }

  delete(record) {
    let alert = this.alertCtrl.create({
      title: 'Delete ' + record.coin + ' record',
      message: 'Do you want to delete this record?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.records.splice(this.records.indexOf(record), 1);
            for(var i in this.records){
              this.records[i] = JSON.stringify(this.records[i]);
            }
            this.storage.set('records', this.records);
            this.refresh.emit('refresh');
          }
        }
      ]
    });
    alert.present();
  }

}
