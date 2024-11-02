import { Component, OnInit } from '@angular/core';
import { BudgetService } from './budget.service';
import {MatDialog} from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { Budget } from './budget';
import {AddComponent} from './add/add.component';
@Component({
  selector: 'ngx-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
 //readonly dialog = inject(MatDialog);
 displayedColumns: string[] = ['id', 'dateFrom', 'dateTo', 'amount'
  ,'usedAmount','usedAmountAvg','couldSaveAmount','availableAmount','availableAmountAvg','createAt'];


 constructor(public dialog: MatDialog,private budgetService: BudgetService,private cdr: ChangeDetectorRef 
 ) {}

 ngOnInit(): void {
  this.selectData()
}

 dataSource:Budget[] = []
 selectData(){
  this.budgetService.selectData().subscribe(
    (response) => {
      debugger
      this.dataSource = response.data;
      this.cdr.detectChanges();
      console.log(this.dataSource);
    },
    (error) => {
      debugger
      console.log(error);
    },
  )
}
addData() {
  debugger
  console.log("Always Love");
  const dialogRef = this.dialog.open(AddComponent,{
    disableClose: true, // 禁止点击背景和按下 ESC 键关闭
  });
  dialogRef.afterClosed().subscribe(result => {
    debugger
    console.log(result);
  });
}
}
