import {Component, OnInit} from '@angular/core';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AccountAddComponent} from './account-add/account-add.component';
import { AccountDataService } from './account.data.service';
import { ChangeDetectorRef } from '@angular/core';
export interface Account {
  id: number,
  accountName: string;
  accountIcon: string;
  accountBalance: number;
  createAt: string;
}
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'ngx-account',
  styleUrls: ['./account.component.scss'],
  templateUrl: './account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit{
  displayedColumns: string[] = ['position', 'AcountName', 'Balance', 'Icon','defaultAccount',"createAt"];
  dataSource:Account[] = 
  []
  clearTable() {
    console.log("I WILL ALWAYS LOVE U");
  }


  //readonly dialog = inject(MatDialog);
  constructor(public dialog: MatDialog,private accountDataService: AccountDataService,private cdr: ChangeDetectorRef 

  ) {}
  ngOnInit(): void {
    this.selectData()
  }
  selectData(){
    this.accountDataService.selectData().subscribe(
      (response) => {
        
        this.dataSource = response.data;
        this.cdr.detectChanges();
        console.log(this.dataSource);
      },
      (error) => {
        
        console.log(error);
      },
    )
  }
  addData() {
    
    console.log("Always Love");
    const dialogRef = this.dialog.open(AccountAddComponent,{
        disableClose: true, // 禁止点击背景和按下 ESC 键关闭
      });
    dialogRef.afterClosed().subscribe(result => {
      
      console.log(result);
    });
  }
}



