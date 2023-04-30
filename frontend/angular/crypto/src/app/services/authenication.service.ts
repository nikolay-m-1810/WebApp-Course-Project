import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser$: Observable<string | null>;
  public public_address:string='';

  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('currentUser'));
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public login(username: string, password: string): void {
    // Check the username and password against the database
    // If they match, set the current user in local storage and emit it through the currentUser$ observable
    localStorage.setItem('currentUser', username);
    this.currentUserSubject.next(username);
    this.http.get<any>('http://localhost:8080/api/user/'+username,).subscribe(response =>{
          if(response){
            this.public_address=response[0].public_address;
            console.log(this.public_address);
          }
      });
    }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  isLoggedIn(): boolean {
    // check if currentUserSubject has a value
    return !!this.currentUserSubject.getValue();
  }

}

