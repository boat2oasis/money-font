import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    const authToken = this.cookieService.get('Authorization'); // 替换为你的 cookie 名称
    // 如果 cookie 存在，将它添加到请求头中
    if (authToken) {
      const authReq = req.clone({
    
        setHeaders: {
          Authorization: authToken
        }
      });
      return next.handle(authReq);
    }
    // 如果没有 token，直接发送请求
    return next.handle(req);


  }
}
