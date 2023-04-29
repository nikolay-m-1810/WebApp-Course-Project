import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/authenication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crypto';
  currentUser: string | null = null;
  constructor(private authService:AuthService){}


  ngOnInit() {
    // set up currentUser subscription
    this.authService.currentUser$.subscribe(user => {
      console.log('current user:', user);
      this.currentUser = user;
    });
  }
}
