import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable,Subject} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpentInformationService {
  private getList = environment.apiUrl+"/spentInformation/list";
  private postDatas = environment.apiUrl+"/spentInformation/save";
  private deleteDatas = environment.apiUrl+"/spentInformation/delete";

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
    return this.http.post(this.postDatas,data, { headers });
  }

  // Method to fetch data from the API
  deleteData(id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    // 设置请求参数
    const params = new HttpParams()
      .set('id',id)


    return this.http.get(this.deleteDatas, {headers, params});
  }
}
