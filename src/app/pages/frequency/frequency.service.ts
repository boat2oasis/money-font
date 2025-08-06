import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable,Subject} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FrequencyService {
  private getList = environment.apiUrl+"/frequency/list";
  private callSource = new Subject<void>();
  callSelectData$ = this.callSource.asObservable();

  triggerSelectData() {
    this.callSource.next();
  }

  constructor(private http: HttpClient) { }
  selectData(data: any): Observable<any> {
    //return this.http.get(this.getList); // Make a GET request
    const headers = { 'Content-Type': 'application/json' }; // 可选的自定义头
    
    return this.http.post(this.getList, data, { headers }); // 发送 POST 请求

  }

}

