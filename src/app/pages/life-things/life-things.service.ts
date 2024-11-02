// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable,Subject} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LifeThingsService {
  private getList = environment.apiUrl+"/lifeThings/list";
  private postAcocuntData = environment.apiUrl+"/lifeThings/save";

  private callSource = new Subject<void>();
  callSelectData$ = this.callSource.asObservable();

  triggerSelectData() {
    this.callSource.next();
  }

  constructor(private http: HttpClient) { }
  selectData(): Observable<any> {
    return this.http.get(this.getList); // Make a GET request
  }
  // Method to fetch data from the API
  postData(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.postAcocuntData, data, { headers });
  }
}
