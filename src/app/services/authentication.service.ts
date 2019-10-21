import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return token != null;
  }

  public authenticate() {
    sessionStorage.setItem('token', 'logged in');
  }

  public logoutUser() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  get email(): string {
    return "upright@ccsi.org"
  }
}
