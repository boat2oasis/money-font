import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,private loginService:LoginService,private cookieService: CookieService,private router: Router) {
    this.loginForm = this.fb.group({
      accountUsername: ['', Validators.required],
      accountPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      let usr = {
        username:formValues.accountUsername,
        password:formValues.accountPassword
      }
      this.loginService.postData(usr).subscribe(
        (response) => {
          debugger
          console.log(response); // Log the response data to the console
          localStorage.removeItem('Authorization'); // 替换为你的 cookie 名称
          localStorage.setItem('Authorization',"Bearer "+response.data); // 替换为你的 cookie 名称
          this.router.navigate(['/page']);
        },
        (error) => {
          debugger
          console.error('Error fetching data:', error); // Log any errors
        }
      );
    }
  }
}
