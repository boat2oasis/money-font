
import { Component, Inject,OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { Dialogue } from './Dialogue';
import {PageEvent } from '@angular/material/paginator';
import { SentenceService } from '../../sentence/sentence.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'ngx-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})

 

export class DialogueComponent implements OnInit {
  displayedColumns: string[] = ['id','series','sentence','chinese'];
  value = '';
  length = 50;
  pageSize = 50;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
 
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
 
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
 
  constructor(public dialog: MatDialog,
   private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any,private sentenceService: SentenceService,private cdr: ChangeDetectorRef 
  ) {}
 
  ngOnInit(): void {
   this.selectData()
 }
 highlightText(text: string, keyword: string): SafeHtml {
 
   //if (!keyword) return text;
   
   
   // 动态构造正则表达式，忽略大小写，匹配完整单词或单字符
   const regex = new RegExp(`\\b${keyword}\\b|(^|\\s)${keyword}(?=\\s|$)`, 'gi');
   return this.sanitizer.bypassSecurityTrustHtml(text.replace(regex, (match) => `<span style="background-color:yellow;font-size:16px">${match}</span>`));
   //return text.replace(regex, `<span class="highlight">$1</span>`);
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
     key: this.data.word.id,
     type:1
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
 