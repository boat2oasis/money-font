
import { FrequencyComponent } from './frequency.component';
import { DialogueComponent } from './dialogue/dialogue.component';
import {MatCardModule} from '@angular/material/card';
import {
  NbCardModule,NbButtonModule,
} from '@nebular/theme';


import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {JsonPipe} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FrequencyComponent,DialogueComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    MatCardModule,
    CommonModule,NbCardModule,NbButtonModule,MatTableModule,
    MatIconModule,MatButtonModule,FormsModule,MatInputModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    JsonPipe,
    MatDialogModule
  ]
})
export class FrequencyModule { }
