import {Component, OnInit} from '@angular/core';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LifeThingsAddComponent} from './life-things-add/life-things-add.component';
import { LifeThingsService } from './life-things.service';
import { ChangeDetectorRef } from '@angular/core';

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
  displayedColumns: string[] = ['categoryName', 'name', 'price', 'purchaseDate','isCarried',"storageLocation","operation"];

  dataSource=[];

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
        
        this.dataSource = response.data;
        this.cdr.detectChanges();
        console.log(this.dataSource);
      },
      (error) => {
        
        console.log(error);
      },
    )
  }


  expendData(index:number){
      
    if(this.dataSource[index].expend===0 && this.dataSource[index].type===0){
      this.dataSource.splice(index + 1, 0, ...this.dataSource[index].children);

      this.dataSource[index].expend=1
      this.dataSource = [...this.dataSource];
    }else if(this.dataSource[index].expend===1 && this.dataSource[index].type===0){
      this.dataSource[index].expend=0

      let length =  this.dataSource[index].children.length
      let first = this.dataSource.slice(0, index+1);
      first.push(... this.dataSource.slice(index+length+1,this.dataSource.length))
      this.dataSource = [...first];
    }
}

  editThings(record){
    
    console.log("Always Love");
    const dialogRef = this.dialog.open(LifeThingsAddComponent,{
        disableClose: true, // 禁止点击背景和按下 ESC 键关闭

        data: {
          record: record,
        },

      });
    dialogRef.afterClosed().subscribe(result => {
      
      console.log(result);
    });
  }

  addData() {
    
    console.log("Always Love");
    const dialogRef = this.dialog.open(LifeThingsAddComponent,{
        disableClose: true, // 禁止点击背景和按下 ESC 键关闭
      });
    dialogRef.afterClosed().subscribe(result => {
      
      console.log(result);
    });
  }
}



