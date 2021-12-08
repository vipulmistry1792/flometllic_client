import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MqttDataService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
}
  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/current`);
}
// addsch() {
//   return this.http.patch<any>(`${environment.apiUrl}/sch`,);
// }
getAllmngo() {
return this.http.get<any>(`${environment.apiUrl}/mdata/current`);
}
mngodatewise(fromDate,toDate) {
  return this.http.post<any>(`${environment.apiUrl}/mdata`, {"fromDate":fromDate,"toDate":toDate});
   }
}
