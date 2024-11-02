import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private getList = environment.apiUrl+"/budget/list";
  private saveData = environment.apiUrl+"/budget/save";
  constructor(private http: HttpClient) { }
  selectData(): Observable<any> {
    return this.http.get(this.getList); // Make a GET request
  }
  // Method to fetch data from the API
  postData(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.saveData, data, { headers });
  }
}
