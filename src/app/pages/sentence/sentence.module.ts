import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentenceComponent } from './sentence.component';
import {MatCardModule} from '@angular/material/card';

import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {JsonPipe} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {
  NbCardModule,NbButtonModule,
} from '@nebular/theme';

@NgModule({
  declarations: [SentenceComponent],
  imports: [
    CommonModule,NbCardModule,NbButtonModule,MatTableModule,
    MatIconModule,MatButtonModule,FormsModule,MatInputModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    JsonPipe,
  ]
})
export class SentenceModule { }
