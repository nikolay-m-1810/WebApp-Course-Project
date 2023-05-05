import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/authenication.service';
import {Deposit} from "../interfaces/Deposit";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {
  dep:Deposit = {} as Deposit
  constructor(private http:HttpClient,private authService: AuthService ){
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.dep.public_address = user.public_address;
      }
    });

  }
  deposit(){
    console.log(this.dep.public_address);
    console.log(this.dep.deposit_amount)
    this.http.post('http://localhost:8080/transfer/deposit', this.dep,{responseType:"text"}).subscribe(
      (response) => {
        location.reload()

      },
      (error) => {
        // Handle errors

      }
    );
  }
}
