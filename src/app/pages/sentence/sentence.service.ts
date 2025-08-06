import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable,Subject} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SentenceService {
  private searchList = environment.apiUrl+"/dialogue/search";
  private getList = environment.apiUrl+"/dialogue/list";
  private callSource = new Subject<void>();
  callSelectData$ = this.callSource.asObservable();

  triggerSelectData() {
    this.callSource.next();
  }

  constructor(private http: HttpClient) { }
  selectData(data: any): Observable<any> {
    //return this.http.get(this.getList); // Make a GET request
    debugger
    const headers = { 'Content-Type': 'application/json' }; // 可选的自定义头
    if(data.type == 1){
      return this.http.post(this.getList, data, { headers }); // 发送 POST 请求
    }else if(data.type == 2) {
      return this.http.post(this.searchList, data, { headers }); // 发送 POST 请求
    }
    


  }

}

