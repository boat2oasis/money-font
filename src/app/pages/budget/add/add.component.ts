import { Component,OnInit} from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import {BudgetService} from '../budget.service'
import { Budget } from '../budget';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit{
  userForm: FormGroup;  // 表单
  budget: Budget; 
  constructor(private fb: FormBuilder,
  private budgetService: BudgetService,
  private dialogRef: MatDialogRef<AddComponent>) {}
  
  ngOnInit() {
    // 使用 FormBuilder 创建表单并初始化表单属性
    this.userForm = this.fb.group({
      dateFrom: '', 
      dateTo: '', 
      amount: '',
    });
  }

  addData() {
    if (this.userForm.valid) {

      this.budget = new Budget(
        '',
        this.userForm.value.dateFrom,
        this.userForm.value.dateTo,
        this.userForm.value.amount,
        ''
      );
      this.budgetService.postData(this.budget).subscribe(
        (response) => {
          this.dialogRef.close(this.userForm.value);
        },
        (error) => {
          
          console.error('Error fetching data:', error); // Log any errors
        }
      );

    }
  }
}
