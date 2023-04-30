import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/authenication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  username:string='';
  public_address:string='';

  constructor(public authService:AuthService,private http:HttpClient) {
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(currentUser => {
      if (currentUser !== null) {
        this.username = currentUser;
        this.http.get<any>('http://localhost:8080/api/user/'+this.username,).subscribe(response =>{
          if(response && response.length >0){
            this.public_address=response[0].public_address;
            console.log(this.public_address);
          }
      });
      }
    });
  }
  logout(): void {
    this.authService.logout();
  }
}
