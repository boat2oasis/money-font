import { Component,OnInit, ChangeDetectorRef } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import { User } from '../user'; 
import { FormGroup,FormBuilder } from '@angular/forms';
import { AccountDataService } from '../account.data.service';
import { FileUploadService } from '../../components/upload-images/file-upload.service';
import { MatDialogRef } from '@angular/material/dialog';

interface KeyValue {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'ngx-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class AccountAddComponent implements OnInit{
    userForm: FormGroup;  // 表单
    user: User;  // 实体对象
    accountIcon:string;

    deFaultAccountList: KeyValue[] = [
      {value: '1', viewValue: '默认消费账户'},
      {value: '0', viewValue: '非默认消费账户'},
    ];

    constructor(private fb: FormBuilder,private uploadService: FileUploadService,
      private accountDataService: AccountDataService,
      private cdr: ChangeDetectorRef,
      private dialogRef: MatDialogRef<AccountAddComponent>) {}


    ngOnInit() {
        // 使用 FormBuilder 创建表单并初始化表单属性
        this.userForm = this.fb.group({
            accountName: '', 
            accountBalance: '', 
            createAt: '',
            accountIcon: '',
            defaultAccount:''
        });
        this.uploadService.data$.subscribe(data => this.accountIcon = data);
      }
    addData() {
      if (this.userForm.valid) {

        this.user = new User(
          this.userForm.value.accountName,
          this.userForm.value.accountBalance,
          this.userForm.value.createAt,
          this.accountIcon = this.imagebase64,
          this.userForm.value.defaultAccount
        );

        this.accountDataService.postData(this.user).subscribe(
          (response) => {
            
            console.log(response); // Log the response data to the console
            
             this.dialogRef.close(this.userForm.value);
          },
          (error) => {
            
            console.error('Error fetching data:', error); // Log any errors
          }
        );


      }
        

      }


    uploaded = false;


      centered = false;
      disabled = false;
    
      imagebase64 = ""
      unbounded = false;
    
      
      hide = true;
      clickEvent(event: MouseEvent) {
        //this.hide.set(!this.hide());
        event.stopPropagation();
      }
      removeImage(): void {
        console.log("FUCK U");
        this.imagebase64 = "";
        this.uploaded = false;
        this.cdr.detectChanges();
      }
    
      selectFiles(event: any): void {
     
        
        const input = event.target as HTMLInputElement;
    
        if (input.files && input.files[0]) {
          const file = input.files[0];
          const reader = new FileReader();
    
          reader.onload = () => {
            const base64String = reader.result as string;
            console.log(base64String); // 输出 base64 编码的图片数据
            this.imagebase64 = base64String;
            this.uploaded = true;
            this.cdr.detectChanges();
          };
    
          reader.readAsDataURL(file);
    
        }
      }
      
}
