import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              // 这里可以处理所有成功的响应
              console.log('成功响应拦截:', event);
          }
      }),
      catchError((error: HttpErrorResponse) => {
        
        if (error.status === 403) {
          // 处理 403 错误，重定向到登录页面
          this.router.navigate(['/login']);
        }
        
        // 将错误传递到组件
        return throwError(() => error);
      })
    );
  }
}
