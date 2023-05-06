import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/authenication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Wallets {
  public_address:string;
  crypto_id:number;
  amount:number;
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  wallets:Wallets[]=[];
  public_address:string='';
  constructor(public authService:AuthService,private http:HttpClient) {

  }
  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.public_address=user.public_address;
        this.getWalletContents(this.public_address);
      }
    });
  }
  getWalletContents(public_address:string){
    this.http.get<any>(`http://localhost:8080/transfer/getWallet?public_address=${public_address}`)
      .subscribe((data:any)=>{
        this.wallets = data
        console.log(this.wallets)
      })
    }

  logout(): void {
    this.authService.logout();
  }
}
