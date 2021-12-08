import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnergyData } from '../energy-data';

@Injectable({
  providedIn: 'root'
})
export class TimeseriesService {
  constructor(private http: HttpClient) { }
  getdata (): Observable<EnergyData[]> {
    return this.http.get<EnergyData[]>('./assets/energy_data.json');
  }
}
