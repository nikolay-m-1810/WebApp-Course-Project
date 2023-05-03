import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private currentUserSubject: BehaviorSubject<{ username: string; public_address: string } | null>;
  public currentUser$: Observable<{ username: string; public_address: string } | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<{ username: string; public_address: string } | null>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public login(username: string, password: string): void {
    // Check the username and password against the database
    // If they match, set the current user in local storage and emit it through the currentUser$ observable
    localStorage.setItem('currentUser', JSON.stringify({ username: username, public_address: '' }));
    this.currentUserSubject.next({ username: username, public_address: '' });
    this.http.get<any>('http://localhost:8080/api/user/'+username,).subscribe(response =>{
          if(response){
            const user = { username: username, public_address: response[0].public_address };
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            console.log(user.public_address)
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