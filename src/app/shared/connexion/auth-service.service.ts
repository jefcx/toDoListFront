import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    //localStorage.setItem('user', '21b0c602-756c-4cb7-9fce-c9c876099b2a');
  }

  public getToken(): string {
    const jsonToken = localStorage.getItem('user');
    console.log('mon token::' + jsonToken);
    return jsonToken;
  }

  public setToken(token: string): void {
    localStorage.setItem('user', token);
  }
}
