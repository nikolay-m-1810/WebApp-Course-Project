import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';

import { interval } from 'rxjs';
import { AuthService } from '../services/authenication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  btc ='BTC';
  ada='ADA';
  eth='ETH';
  price_btc:string = '';
  price_ada:string = '';
  price_eth:string='';
  currentUser:string | null = null;
  constructor(private http:HttpClient,public authService:AuthService){
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
  });
}

  ngOnInit() {
    this.http.get<any>(`http://localhost:8080/api/price/${this.btc}`).subscribe(
      data => {
        const value_usdt = data[0][0].value_usdt;
        this.price_btc = value_usdt.toFixed(2);
      },
      error => {
        console.log(error);
      }
    );
    this.http.get<any>(`http://localhost:8080/api/price/${this.ada}`).subscribe(
      data => {
        const value_usdt = data[0][0].value_usdt;
        this.price_ada = value_usdt.toFixed(2);
      },
      error => {
        console.log(error);
      }
    );
    this.http.get<any>(`http://localhost:8080/api/price/${this.eth}`).subscribe(
      data => {
        const value_usdt = data[0][0].value_usdt;
        this.price_eth = value_usdt.toFixed(2);
      },
      error => {
        console.log(error);
      }
    );

  }
}



