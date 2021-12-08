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
export class MachineMasterService {
  public Machine: Observable<MachineMaster>;
  constructor(        
    private router: Router,
    private http: HttpClient) {

     }

 create(Machine: MachineMaster) {
      return this.http.post(`${environment.apiUrl}/machine`, Machine);
  }

  getAll() {
      return this.http.get<MachineMaster[]>(`${environment.apiUrl}/machine`);
  }

  getById(id: string, params) {
      return this.http.post<MachineMaster>(`${environment.apiUrl}/machine/Edit/${id}`,params);
  }

  update(id, params) {
      return this.http.post(`${environment.apiUrl}/machine/${id}`, params)
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
      return this.http.delete(`${environment.apiUrl}/machine/${id}`)
          .pipe(map(x => {
              return x;
          }));
  }


}
