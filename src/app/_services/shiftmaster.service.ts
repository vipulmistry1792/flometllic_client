import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Shiftmaster } from '../_models';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ShiftmasterService {
  public Shift: Observable<Shiftmaster>;
  constructor(        
    private router: Router,
    private http: HttpClient) {

     }

     create(Machine: Shiftmaster) {
      return this.http.post(`${environment.apiUrl}/shift`, Machine);
  }

  getAll() {
      return this.http.get<Shiftmaster[]>(`${environment.apiUrl}/shift`);
  }
  getrunningshift() {
      return this.http.get<Shiftmaster[]>(`${environment.apiUrl}/shift/runningshift`);
  }
  getById(id: string, params) {
      return this.http.post<Shiftmaster>(`${environment.apiUrl}/shift/Edit/${id}`,params);
  }

  update(id, params) {
      return this.http.post(`${environment.apiUrl}/shift/${id}`, params)
          .pipe(map(x => {
              // // update stored user if the logged in user updated their own record
              // if (id == this.userValue.id) {
              //     // update local storage
              //     const user = { ...this.userValue, ...params };
              //     localStorage.setItem('user', JSON.stringify(user));

              //     // publish updated user to subscribers
              //     this.userSubject.next(user);
              // }
              return x;
          }));
  }

  delete(id: string) {
      return this.http.delete(`${environment.apiUrl}/shift/${id}`)
          .pipe(map(x => {
              return x;
          }));
  }



}
