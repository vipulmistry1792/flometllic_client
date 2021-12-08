import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tags } from '../_models'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${environment.apiUrl}/tags`);
  }

  get(id: any): Observable<Tags> {
    return this.http.get(`${environment.apiUrl}/tags/${id}`);
  }

  create(data: any): Observable<any> {
    
    return this.http.post(`${environment.apiUrl}/tags`, data);
  }

  update(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/tags/up`, data);
  }

  delete(id: any,data:any): Observable<any> {
    console.log(data);
    return this.http.delete(`${environment.apiUrl}/tags/${id}`,data);
  }
}
