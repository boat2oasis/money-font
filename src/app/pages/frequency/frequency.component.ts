import {OnInit,Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { FrequencyService } from './frequency.service'
import { Dialogue } from './Dialogue'
import {PageEvent } from '@angular/material/paginator';
import { DialogueComponent } from './dialogue/dialogue.component';
@Component({
  selector: 'ngx-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.scss']
})

export class FrequencyComponent implements OnInit {
  checked = false;
  indeterminate = false;
  labelPosition: 'all' | 'before' | 'after' = 'all';

 displayedColumns: string[] = ['id','word','frequency','coca','operation'];
 value = '';
 length = 50;
 pageSize = 50;
 pageIndex = 0;
 pageSizeOptions = [5, 8,  10, 25, 50];

 hidePageSize = false;
 showPageSizeOptions = true;
 showFirstLastButtons = true;
 disabled = false;

 pageEvent: PageEvent | undefined;

 handlePageEvent(e: PageEvent) {
   this.pageEvent = e;
   this.pageSize = e.pageSize;
   this.pageIndex = e.pageIndex+1;
   this.selectData()
 }




  seeSentence(word: any) {
    
    console.log("Always Love");
    const dialogRef = this.dialog.open(DialogueComponent, {
      disableClose: true, // 禁止点击背景和按下 ESC 键关闭
      data: {
        word: word,
      },
      autoFocus: false, // 禁用自动聚焦
    },
  );
    dialogRef.afterClosed().subscribe(result => {
      
      console.log(result);
    });
  }

 setPageSizeOptions(setPageSizeOptionsInput: string) {
   if (setPageSizeOptionsInput) {
     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
   }
 }

 constructor(public dialog: MatDialog,private sentenceService: FrequencyService,private cdr: ChangeDetectorRef 
 ) {}

 ngOnInit(): void {
  this.selectData()
}


deletData(id:number){
  // this.openSnackBar()
       
 }

onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    this.selectData();
  }
}

Search() {
    this.selectData();
}

 dataSource:Dialogue[] = []
 selectData(){
  let data = {
    size: this.pageSize,
    current: this.pageIndex,
    key: this.value,
    labelPosition:this.labelPosition
  }
  this.sentenceService.selectData(data).subscribe(
    (response) => {
      
      this.dataSource = response.data.records;
      this.length = response.data.total;
      this.cdr.detectChanges();
      console.log(this.dataSource);
    },
    (error) => {
      
      console.log(error);
    },
  )
}
}
