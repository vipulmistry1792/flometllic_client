import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MachineMaster } from '../_models';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MeterdataService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
  currentdata() {
    return this.http.get<any>(`${environment.apiUrl}/meter/current`);
}
meterhistory(metername,fromDate,toDate) {
  return this.http.post<any>(`${environment.apiUrl}/meter/history`,{"metername":metername,"fromDate":fromDate,"toDate":toDate});
}
metersummary(metername,fromDate,toDate) {
  return this.http.post<any>(`${environment.apiUrl}/meter/summary`,{"metername":metername,"fromDate":fromDate,"toDate":toDate});
}
meterbatchno(metername,fromDate,toDate) {
  return this.http.post<any>(`${environment.apiUrl}/meter/batchno`,{"metername":metername,"fromDate":fromDate,"toDate":toDate});
}
meterbatchhistory(metername,batchno) {
  return this.http.post<any>(`${environment.apiUrl}/meter/batchhistory`,{"metername":metername,"batchno":batchno});
}
meterbatchsummary(metername,batchno) {
  return this.http.post<any>(`${environment.apiUrl}/meter/batchsummary`,{"metername":metername,"batchno":batchno});
}
}
