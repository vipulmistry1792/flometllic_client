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
  getbatchdata(data: any): Observable<any> {
    
    return this.http.post(`${environment.apiUrl}/furnacedash/getbatch`, data);
  }
  getbatchhistorydata(data: any): Observable<any> {
    
    return this.http.post(`${environment.apiUrl}/furnacedash/getbatchdetail`, data);
  }
  getenergyconsuption(data: any): Observable<any> {
    
    return this.http.post(`${environment.apiUrl}/furnacedash/getenergydetail`, data);
  }
  getenergyconsumptionhourly(data: any): Observable<any> {
    
    return this.http.post(`${environment.apiUrl}/furnacedash/getenergyhourly`, data);
  }
  getshiftenergyconsumptionhourly(data: any): Observable<any> {
    
    return this.http.post(`${environment.apiUrl}/furnacedash/getshift`, data);
  }
  getidealenergyconumption(data: any): Observable<any> {
    
    return this.http.post(`${environment.apiUrl}/furnacedash/getidealenergy`, data);
  }
  getonlinedata(): Observable<any> {    
    return this.http.get(`${environment.apiUrl}/furnacedash/online`);
  }
}
