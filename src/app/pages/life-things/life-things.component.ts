import {Component, OnInit} from '@angular/core';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LifeThingsAddComponent} from './life-things-add/life-things-add.component';
import { LifeThingsService } from './life-things.service';
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
  styleUrls: ['./life-things.component.scss'],
  templateUrl: './life-things.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LifeThingsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'price', 'purchaseDate','isCarried',"storageLocation","imageUrl"];
  dataSource:Account[] = []
  clearTable() {
    console.log("I WILL ALWAYS LOVE U");
  }
  //readonly dialog = inject(MatDialog);
  constructor(public dialog: MatDialog,private lifeThingsService: LifeThingsService,private cdr: ChangeDetectorRef 
  ) {}
  ngOnInit(): void {
    
 this.lifeThingsService.callSelectData$.subscribe(() => {
  this.selectData();
});

    this.selectData()
  }
  selectData(){
    this.lifeThingsService.selectData().subscribe(
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
    const dialogRef = this.dialog.open(LifeThingsAddComponent,{
        disableClose: true, // 禁止点击背景和按下 ESC 键关闭
      });
    dialogRef.afterClosed().subscribe(result => {
      debugger
      console.log(result);
    });
  }
}



