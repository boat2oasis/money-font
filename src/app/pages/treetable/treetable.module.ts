import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeTableComponent } from './treetable.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NbIconModule} from '@nebular/theme';
@NgModule({
  declarations: [
    TreeTableComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    NbIconModule
  ]
})
export class TreetableModule { }
