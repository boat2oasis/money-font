import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

import {

  FormsModule,

} from '@angular/forms';


import {
      NbCardModule,NbButtonModule,NbMenuModule
    } from '@nebular/theme';
import { ThemeModule } from "../../@theme/theme.module";

@NgModule({
  imports: [
      CommonModule,
      MatInputModule,
      MatButtonModule,
      ThemeModule,
      MatCardModule,NbCardModule,NbButtonModule,NbMenuModule,
      ReactiveFormsModule,FormsModule
  ],
  declarations: [
    LoginComponent,
  ],
})
export class LoginModule {
}
