
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { SentenceService } from './sentence.service';
import { Dialogue } from './Dialogue';
import {PageEvent } from '@angular/material/paginator';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'ngx-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.scss']
})

 

export class SentenceComponent implements OnInit {
 displayedColumns: string[] = ['series','sentence','chinese'];
 value = '';
 length = 50;
 pageSize = 50;
 pageIndex = 0;
 pageSizeOptions = [5, 10, 25, 50];

 hidePageSize = false;
 showPageSizeOptions = true;
 showFirstLastButtons = true;
 disabled = false;

 pageEvent: PageEvent;

 handlePageEvent(e: PageEvent) {
   this.pageEvent = e;
   this.pageSize = e.pageSize;
   this.pageIndex = e.pageIndex;
   this.selectData()
 }

 highlightText(text: string): SafeHtml {
  
    //if (!keyword) return text;
    
    
    // 动态构造正则表达式，忽略大小写，匹配完整单词或单字符
    return this.sanitizer.bypassSecurityTrustHtml(text);
    //return text.replace(regex, `<span class="highlight">$1</span>`);
  }
  

 setPageSizeOptions(setPageSizeOptionsInput: string) {
   if (setPageSizeOptionsInput) {
     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
   }
 }

 constructor(public dialog: MatDialog,private sentenceService: SentenceService,private cdr: ChangeDetectorRef 
 , private sanitizer: DomSanitizer,) {}

 ngOnInit(): void {
  this.selectData()
}



onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    this.selectData();
  }
}

 dataSource:Dialogue[] = []
 selectData(){
  let data = {
    size: this.pageSize,
    current: this.pageIndex,
    key: this.value,
    type:2
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
