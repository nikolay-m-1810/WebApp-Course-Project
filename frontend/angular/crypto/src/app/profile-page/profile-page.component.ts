import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/authenication.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  username:string='';
  //currentUser:any;

  constructor(public authService:AuthService) {

  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(currentUser => {
      if (currentUser) {
        this.username = currentUser;
      }
    });

  }
  logout(): void {
    this.authService.logout();
  }
}
