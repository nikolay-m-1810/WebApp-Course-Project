import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/authenication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface Wallets {
  public_address:string;
  crypto_id:number;
  amount:number;
  crypto_name:string;
  value_usdt:number;
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  wallets:Wallets[]=[];
  public_address:string='';
  username:string='';
  total:number=0;
  constructor(public authService:AuthService,private http:HttpClient,private router:Router) {

  }
  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.username=user.username;
        this.public_address=user.public_address;
        this.getWalletContents(this.public_address);
      }
    });
  }
  getWalletContents(public_address:string){
    this.http.get<any>(`http://localhost:8080/transfer/getWallet?public_address=${public_address}`)
      .subscribe((data:any)=>{
        this.wallets = data
        console.log(this.wallets);
        for (const wallet of this.wallets) {
          if (wallet.amount && wallet.value_usdt) { 
            this.total += wallet.value_usdt * wallet.amount;
          }
        }
      });
    }

    deleteUser(public_address:string){
      if (confirm(`Confirm your actions! Are you sure you want to delete user: ${this.username} `)) {
        this.http.delete(`http://localhost:8080/api/user/${public_address}`).subscribe(()=>{
            alert("User is deleted. You will be redirected to the main page!");
            this.logout();
            this.router.navigate(['/']);
        });
      }
    }

  logout(): void {
    this.authService.logout();
  }
}
