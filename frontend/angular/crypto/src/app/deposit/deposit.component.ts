import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/authenication.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {
  amount:number=0;
  constructor(private http:HttpClient,private authService: AuthService ){
  }
  deposit(){
    this.http.post('/api/deposit', { amount: this.amount }).subscribe(
      (response) => {
        // Update the user's balance with the new amount returned by the backend
      },
      (error) => {
        // Handle errors
      }
    );
  }
}
