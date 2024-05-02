import { Injectable } from '@angular/core';
import { User } from '../Modéles/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4000/auth/signup';
  private apiUrl1 = 'http://localhost:4000/auth/signin';

  constructor(private http: HttpClient) {}

  SignUp(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  SignIn(username: string, password: string): Observable<User> {
    
    return this.http.post<User>(this.apiUrl1, {username, password});
  }

  

  
  
}
