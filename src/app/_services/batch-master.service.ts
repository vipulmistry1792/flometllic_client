import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BatchMaster,MachineMaster } from '../_models';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BatchMasterService {
  public Batch: Observable<BatchMaster>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
  create(Batch: BatchMaster) {
    return this.http.post(`${environment.apiUrl}/batchmaster`, Batch);
}

getAll() {
    return this.http.get<BatchMaster[]>(`${environment.apiUrl}/batchmaster`);
}
getById(id: string, params) {
    return this.http.post<BatchMaster>(`${environment.apiUrl}/batchmaster/Edit/${id}`,params);
}
update(id, params) {
    return this.http.post(`${environment.apiUrl}/batchmaster/${id}`, params)
        .pipe(map(x => {
            return x;
        }));
}
delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/batchmaster/${id}`)
        .pipe(map(x => {
            return x;
        }));
}



}
