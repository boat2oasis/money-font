import { Component,Input,inject } from '@angular/core';
import { SpentInformationService } from './spent-information.service';
import { ChangeDetectorRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ChangeDetectionStrategy} from '@angular/core';
import { SpentInformationAddComponentComponent } from './spent-information-add.component/spent-information-add.component.component';
import { AccountDataService } from '../account/account.data.service';

import {MessageSuccessComponent} from '../components/message/message.success.component'

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'ngx-spent-information',
  templateUrl: './spent-information.component.html',
  styleUrls: ['./spent-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpentInformationComponent {

  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  dataSource=[];

  displayedColumns: string[] = 
   [
  'spentDate',
  'productServiceName','price','quantity','pricees','categoryName',
  'usedForName','accountName','necessaryName','couldSave','operation'
  ];


  constructor(public dialog: MatDialog,
    private spentInformationService: SpentInformationService,
    private cdr: ChangeDetectorRef,
    private accoutService: AccountDataService){}

    ngOnInit(): void {
      this.selectData();
      this.spentInformationService.callSelectData$.subscribe(() => {
        this.selectData();
      });
    }

  


    addData() {
      debugger
      console.log("Always Love");
      const dialogRef = this.dialog.open(SpentInformationAddComponentComponent, {
        disableClose: true, // 禁止点击背景和按下 ESC 键关闭
      });
      dialogRef.afterClosed().subscribe(result => {
        debugger
        console.log(result);
      });
    }


    openSnackBar() {
      this._snackBar.open("删除成功!!! 🍕","", {
        duration: 2000, // 设置持续时间为 3000 毫秒 (3秒)
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['custom-snackbar']
      });
    }

    deletData(id:number){
     // this.openSnackBar()
          
     
      this.spentInformationService.deleteData(id).subscribe(
        (response) => {
          this.openSnackBar()
          this.selectData()
        },
        (error) => {
          debugger
        },
      ) 
    }
   

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

    selectData(){
      this.spentInformationService.selectData().subscribe(
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

    getShowOn(index: number) {
      const minWithForMultipleColumns = 400;
      const nextColumnStep = 100;
      return minWithForMultipleColumns + (nextColumnStep * index);
    }

}


@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      -
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'father';
  }
}