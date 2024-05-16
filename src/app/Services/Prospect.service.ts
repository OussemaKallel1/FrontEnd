import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProspectModéle } from '../Modéles/Prospect-Modéle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProspectService {
  private apiUrl = 'http://localhost:4000/prospect';

  constructor(private http: HttpClient) {}

  getAllProspects(): Observable<ProspectModéle[]> {
    return this.http.get<ProspectModéle[]>(this.apiUrl);
  }

  deleteProspect(id: Number): Observable<ProspectModéle> {
    return this.http.delete<ProspectModéle>(`${this.apiUrl}/${id}`);
  }

  updateProspect(id: number, nouveauProspect: ProspectModéle): Observable<ProspectModéle> {
    return this.http.put<ProspectModéle>(`${this.apiUrl}/${id}`, nouveauProspect);
  }

  ajouterProspect(nouveauProspect: ProspectModéle): Observable<ProspectModéle> {
    return this.http.post<ProspectModéle>(this.apiUrl, nouveauProspect);
  }

  
}
