import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective, baseColors } from 'ng2-charts';
import {Order} from "../interfaces/Order";
import {FormBuilder, FormControl, FormControlName, FormGroup} from "@angular/forms";
import {AuthService} from "../services/authenication.service";

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss'],
  providers: [BaseChartDirective]
})
export class TradingComponent implements OnInit {
  crypto:Crypto | null = null;

  order:Order = {} as Order;

  buyForm: FormGroup;
  constructor(private http:HttpClient,private builder:FormBuilder,private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.order.public_address = user.public_address;
      }
    });
    //creating values for the form
    this.buyForm=builder.group({
      crypto_name:new FormControl(""),
      amount:new FormControl("")
    })

  }
  ngOnInit(): void {


  }
  buy(){
    // console.log(this.crypto);
    // this.crypto = crypto;
    //assigning values to the object
    this.order.crypto_name = this.buyForm.get('crypto_name')?.value;
    this.order.amount = this.buyForm.get('amount')?.value;

    this.http.put("http://localhost:8080/transfer/buy",this.order,{responseType:"text"})
      .subscribe((data)=>{
        const response = JSON.parse(data);
        console.log(response["status"])
        if(response["status"]==="success"){
          alert("Successful Transaction")
        }
        else{
          alert("Transaction Failed - Not enough funds")
        }
        location.reload()
      })
  }

}


