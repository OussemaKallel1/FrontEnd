import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModéle } from '../Modéles/client-modéle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:4000/client';
  private apiUrl1 = 'http://localhost:8080/contact';

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<ClientModéle[]> {
    return this.http.get<ClientModéle[]>(this.apiUrl1);
  }

  deleteClient(id: Number): Observable<ClientModéle> {
    return this.http.delete<ClientModéle>(`${this.apiUrl1}/${id}`);
  }

  ajouterClient(nouveauClient: ClientModéle): Observable<ClientModéle> {
    return this.http.post<ClientModéle>(this.apiUrl1, nouveauClient);
  }

  updateClient(
    id: number,
    nouveauClient: ClientModéle
  ): Observable<ClientModéle> {
    return this.http.put<ClientModéle>(`${this.apiUrl}/${id}`, nouveauClient);
  }
}
