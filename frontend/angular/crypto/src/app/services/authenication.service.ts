import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser$: Observable<string | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('currentUser'));
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public login(username: string, password: string): void {
    // Check the username and password against the database
    // If they match, set the current user in local storage and emit it through the currentUser$ observable
    localStorage.setItem('currentUser', username);
    this.currentUserSubject.next(username);
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  isLoggedIn(): boolean {
    // check if currentUserSubject has a value
    return !!this.currentUserSubject.getValue();
  }

  private authenticateUser(username: string, password: string): string {
    // perform authentication logic and return the username if successful
    return 'John Doe';
  }
}

