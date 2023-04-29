import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/authenication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentUser:string | null = null;

  constructor(public authService: AuthService) {
    // Subscribe to the currentUser observable in the AuthService
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }


  logout(): void {
    this.authService.logout();
  }
}
