import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };
  
  constructor(private http: HttpClient) {}
  
  login() {
    this.http.post('http://localhost:8080/api/user', this.formData)
      .subscribe(response => {
        console.log(response);
      });
  }
}
