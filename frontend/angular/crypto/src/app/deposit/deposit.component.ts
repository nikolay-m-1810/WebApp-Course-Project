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
  public_address:string='';
  constructor(private http:HttpClient,private authService: AuthService ){
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.public_address = user.public_address;
      }
    });

  }
  deposit(){
    console.log(this.public_address);
    console.log(this.amount)
    this.http.post('/api/deposit', { public_address: this.public_address,amount: this.amount }).subscribe(
      (response) => {
        // Update the user's balance with the new amount returned by the backend
        
      },
      (error) => {
        // Handle errors
        
      }
    );
  }
}
