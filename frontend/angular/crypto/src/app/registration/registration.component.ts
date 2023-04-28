import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
    username:string ='';
    password:string = '';
    email:string = '';

  constructor(private http: HttpClient) {  
  }

  onSubmit() {
    // send login data to backend
    this.http.post('http://localhost:8080/api/user/register',{username:this.username, password:this.password,email:this.email},)
      .subscribe(() => {
        console.log("registered succsefully!!");
      }, error => {
        // login failed
        console.error(error);
      });

  }
}
