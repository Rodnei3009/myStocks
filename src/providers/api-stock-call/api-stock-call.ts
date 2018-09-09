import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiStockCallProvider {

  stocks: Observable<any>;
  myArrayLen: number = 0;
  
  constructor(public httpClient: HttpClient) {
    //console.log('Hello ApiStockCallProvider Provider');
  }

  getStockPrice(symbol:string) {

//    let stockPrice: number = 0;
//    let lastDay: string = "";

    this.stocks = this.httpClient.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BRKM5.SA&outputsize=compact&apikey=46CINMD6102WBF2T');

    this.stocks
    .subscribe(data => {
      console.log('my data: ', data);

      /*
      const myObjJSON = JSON.stringify(data['Time Series (Daily)']);
      const myObjSTR = JSON.parse(myObjJSON);

      Object.keys(myObjSTR).sort();
      //this.myArrayLen = Object.keys(myObjSTR).length;

      lastDay = Object.keys(myObjSTR)[0];

      stockPrice = myObjSTR[lastDay]['4. close']; 
      
      return stockPrice
      */
    })
  }
}
