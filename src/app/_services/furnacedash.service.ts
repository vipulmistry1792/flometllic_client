import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tags } from '../_models'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FurnacedashService {

  constructor(private http: HttpClient) { }
  getEnergyData(data): Observable<any> {
    //console.log(data)
    return this.http.get<any>(`${environment.apiUrl}/furnacedash/energy`,{params:data});
  }
  getTimeData(data): Observable<any> {
    //console.log(data)
    return this.http.get<any>(`${environment.apiUrl}/furnacedash/time`,{params:data});
  }
  getmeterdata(data: any): Observable<any> {
    
    return this.http.post(`${environment.apiUrl}/furnacedash/history`, data);
  }
}
