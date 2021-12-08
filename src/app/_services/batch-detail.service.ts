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
export class BatchDetailService {

  constructor(    
    private router: Router,
    private http: HttpClient
    ) { }
    getRunningBatch() {
      return this.http.get<any>(`${environment.apiUrl}/batchdetail/runningbatch`);
  }
  getmachineBatch(id: any,data:any) {
    let paramsdata;
    return this.http.post<any>(`${environment.apiUrl}/batchdetail/batch/${id}`,data);
}
}
