import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map } from "rxjs/operators";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  today = new Date();
  defaultEndDate = new Date(`${this.today.getMonth() + 2}/1/${this.today.getFullYear()}`);
  defaultStartDate = new Date(`${this.today.getMonth() + 1}/1/${this.today.getFullYear()}`);
  constructor(private http: HttpClient) {}

  counts() {
    return this.http.get(`${environment.API}/statistics/counts`).pipe(
      map(data => JSON.parse(JSON.stringify(data)))
    )
  }
  
  activityMap(month = this.today.getMonth(), year = this.today.getFullYear()) {
    const [start, end] = [new Date(`${month+1}/1/${year}`).toISOString(), new Date(`${month + 2}/1/${year}`).toISOString()]
    return this.http.get(`${environment.API}/statistics/periodActivity?start=${start}&end=${end}`).pipe(
      map(data => JSON.parse(JSON.stringify(data)))
    )
  }

  getYears(): Array<number> {
    const years = [];
    const epoch = 2019;
    const diff = epoch + (new Date().getFullYear() - epoch);
    for (let i = epoch; i <= diff; i++) {
      years.push(i);
    }
    return years;
  }
}
