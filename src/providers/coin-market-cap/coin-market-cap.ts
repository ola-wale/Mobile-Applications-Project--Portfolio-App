import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the CoinMarketCapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CoinMarketCapProvider {
  public apiRoot = 'https://api.coinmarketcap.com/v1/';
  constructor(public http: HttpClient) {}

  public getCoins(): Observable<any>{
    return this.http.get(this.apiRoot+'ticker/');
  }

}
