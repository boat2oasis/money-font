import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private getPriceByUsedFor = environment.apiUrl+"/statistics/getPriceByUsedForVo";
  private getPriceByCategory = environment.apiUrl+"/statistics/getSumPriceByCategory";
  private getPriceByDays = environment.apiUrl+"/statistics/getPriceByDays";
  
  constructor(private http: HttpClient) { }
  getPriceByUsedForVo(): Observable<any> {
    return this.http.get(this.getPriceByUsedFor); // Make a GET request
  }
  getPriceByCategoryVo(): Observable<any> {
    return this.http.get(this.getPriceByCategory); // Make a GET request
  }
  getPriceByDayVo(): Observable<any> {
    return this.http.get(this.getPriceByDays); // Make a GET request
  }
}
