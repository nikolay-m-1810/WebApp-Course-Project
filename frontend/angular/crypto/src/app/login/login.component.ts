import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  onSubmit() {
    // send login data to backend
    this.http.post('http://localhost:8080/api/login',{username:this.username, password:this.password},)
      .subscribe((data:any) => {
        // login successful
        console.log();
      }, error => {
        // login failed
        console.error(error);
      });

  }
}
