import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { ApiStockCallProvider } from '../../providers/api-stock-call/api-stock-call'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  stocksPrice: Observable<any>;
  //stocks: any = ['ABEV3', 'PETR4', 'BBAS3', 'BRFS3', 'CAML3', 'CVCB3', 'EZTC3', 'GOLL4', 'IRBR3', 'ITSA4', 'RAIL3', 'SAPR11', 'VULC3'];
  stocks: any = ['ABEV3.SA', 'PETR4.SA', 'BBAS3.SA', 'BRFS3.SA', 'CAML3.SA', 'CVCB3.SA', 'EZTC3.SA', 'GOLL4.SA', 'IRBR3.SA', 'ITSA4.SA', 'RAIL3.SA', 'VULC3.SA'];

  //papeis = [{"symbol": "ABEV3", "price": "10", "lastday": "2018-09-05"}, {"symbol": "PETR4", "price": "20", "lastday": "2018-09-06"}];
  papeis = [];

  lastDay: string = '';
  lastPrice: any;
  symbol: string = '';

  constructor(public navCtrl: NavController, public httpClient: HttpClient) {
    
  }

  getPrice(symbol) {
    return this.httpClient.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+symbol+'&outputsize=compact&apikey=46CINMD6102WBF2T')
  }

  ngOnInit(){
    for(var i=0; i < this.stocks.length; i++){
      
      this.getPrice(this.stocks[i]).subscribe(
        data => { 
          //this.result = data
          const myObjJSON = JSON.stringify(data['Time Series (Daily)']);
          const myObjSTR = JSON.parse(myObjJSON);
  
          Object.keys(myObjSTR).sort();
          //this.myArrayLen = Object.keys(myObjSTR).length;
    
          this.symbol = JSON.stringify(data['Meta Data']['2. Symbol']);
          this.symbol = this.symbol.replace('.SA','');
          this.symbol = this.symbol.replace('"','');
          this.symbol = this.symbol.replace('"','');
          this.lastDay = Object.keys(myObjSTR)[0];
          this.lastPrice = myObjSTR[this.lastDay]['4. close'];
       
          this.papeis.push({"symbol": this.symbol, "price": this.lastPrice, "lastday": this.lastDay});

        },
        err => console.error(err),
        () => {
          alert('Concluído...')
        }
      )     
    }  
    console.log('');   
  }
}
