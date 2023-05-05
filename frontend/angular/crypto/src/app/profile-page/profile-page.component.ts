import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/authenication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(public authService:AuthService,private http:HttpClient) {
    
  }
  ngOnInit(): void {
    //to implement function to show the balance of the crypto currencies!
  }

  
  

  logout(): void {
    this.authService.logout();
  }
}
