import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpentInformationComponent} from './spent-information.component'
import {
  NbCardModule,NbButtonModule,
} from '@nebular/theme';
import { NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
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
import {MatTableModule} from '@angular/material/table';
import { SpentInformationAddComponentComponent } from './spent-information-add.component/spent-information-add.component.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FsIconComponent } from './spent-information.component'
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
  MatButtonModule, MatDialogModule,MatToolbarModule,MatListModule,CommonModule,
  NbIconModule, NbInputModule, NbTreeGridModule]

@NgModule({
  declarations: [SpentInformationComponent,SpentInformationAddComponentComponent,FsIconComponent],
  imports: [
    CommonModule,NbCardModule,NbButtonModule,ReactiveFormsModule,
    ...materialModules,MatSnackBarModule
  ]
})
export class SpentInformationModule { }
