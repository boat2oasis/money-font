
import { BudgetComponent } from './budget.component';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbCardModule,NbButtonModule,
} from '@nebular/theme';
import {MatTableModule} from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component'; 
import { ChartsModule } from '../charts/charts.module';
const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatTableModule,MatCardModule,
  MatButtonModule, MatDialogModule,
  MatToolbarModule,MatListModule,CommonModule,
  NbCardModule,NbCardModule,NbButtonModule,ReactiveFormsModule]


@NgModule({
  declarations: [BudgetComponent, AddComponent],
  imports: [
    ...materialModules,ChartsModule
  ]
})
export class BudgetModule { }
