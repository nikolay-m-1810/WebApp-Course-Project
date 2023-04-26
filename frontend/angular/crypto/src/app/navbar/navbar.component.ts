import { Component } from '@angular/core';
import { UserService } from '../services/authenication.service.spec';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn = false;
  nickname: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.user.subscribe((user: { nickname: string | null; }) => {
      this.isLoggedIn = !!user;
      this.nickname = user ? user.nickname : null;
    });
  }
}
