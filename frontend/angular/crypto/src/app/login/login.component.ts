import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loggedIn:boolean=false;
  username:string='';
  password:string='';
  constructor(private http:HttpClient){}
  onSubmit(){
    const data = {
    username:this.username,
    password:this.password
    }
  this.http.post('/api/getUser',{data}).subscribe(
    (response) => {
    this.loggedIn=true;
    console.log("Logged In {{this.username}}")
  },(error)=>{
    console.log("Error");
  });
  }
}
