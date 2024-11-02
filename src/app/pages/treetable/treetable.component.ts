import {Component} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import { NgZone } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  type:number;
  expend:number;
  children: PeriodicElement[];
}

let ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',type:0,expend:0,children:[
  {position: 2, name: 'Helium', weight: 1.0079, symbol: 'H',type:1,expend:1,children:[]},
  {position: 3, name: 'Lithium', weight: 1.0079, symbol: 'H',type:1,expend:1,children:[]},
  {position: 4, name: 'Beryllium', weight: 1.0079, symbol: 'H',type:1,expend:1,children:[]},
  {position: 5, name: 'Boron', weight: 1.0079, symbol: 'H',type:1,expend:1,children:[]},
  ]},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',type:0,expend:0,children:[
    {position: 2, name: 'Helium', weight: 1.0079, symbol: 'H',type:1,expend:1,children:[]},
    {position: 3, name: 'Lithium', weight: 1.0079, symbol: 'H',type:1,expend:1,children:[]},
    {position: 4, name: 'Beryllium', weight: 1.0079, symbol: 'H',type:1,expend:1,children:[]},
    {position: 5, name: 'Boron', weight: 1.0079, symbol: 'H',type:1,expend:1,children:[]},
    ]},
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'ngx-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeTableComponent {
  constructor(private cdr: ChangeDetectorRef,private ngZone: NgZone) {}
dataSource = ELEMENT_DATA;
  expendData(index:number){
debugger
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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
}
