import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private postDatas = environment.apiUrl+"/users/login";
  constructor(private http: HttpClient) { }
  // Method to fetch data from the API
  postData(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.postDatas,data, { headers });
  }
}
