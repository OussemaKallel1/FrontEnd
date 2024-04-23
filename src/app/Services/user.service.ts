import { Injectable } from '@angular/core';
import { User } from '../Modéles/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  login(username: string, password: string): Observable<User> {
    const url = this.apiUrl + '?username=' + username + '&mdp=' + password;
    return this.http.get<User>(url);
  }

  verifyCredentials(username: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}?username=${username}&password=${password}`);
  }

  
  
}
