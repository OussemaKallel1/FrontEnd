import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModéle } from './client-modéle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:3000/clients'; // Remplacez cette URL par l'URL de votre API

  constructor(private http: HttpClient) {}

getAllClients(): Observable<ClientModéle[]> {
  return this.http.get<ClientModéle[]>(this.apiUrl);
}

deleteClient(id : Number): Observable<ClientModéle> {
  return  this.http.delete<ClientModéle>(`${this.apiUrl}/${id}`);
}

ajouterClient(nouveauClient: ClientModéle): Observable<ClientModéle> {
  return this.http.post<ClientModéle>(this.apiUrl, nouveauClient);
}


updateClient(id: number, nouveauClient: ClientModéle): Observable<ClientModéle> {
  return this.http.put<ClientModéle>(`${this.apiUrl}/${id}`, nouveauClient);
}










}


