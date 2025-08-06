import { Component,OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { LifeThingsService } from '../life-things.service';
import { FileUploadService } from '../../components/upload-images/file-upload.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface KeyValue {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'ngx-account-add',
  templateUrl: './life-things-add.component.html',
  styleUrls: ['./life-things-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class LifeThingsAddComponent implements OnInit{
    userForm: FormGroup;  // 表单
    accountIcon:string;

    deFaultAccountList: KeyValue[] = [
      {value: 1, viewValue: '携带'},
      {value: 0, viewValue: '未携带'},
    ];

    constructor(private fb: FormBuilder,private uploadService: FileUploadService,
      private lifeThingsService : LifeThingsService,
      private cdr: ChangeDetectorRef,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<LifeThingsAddComponent>) {}

    ngOnInit() {
        // 使用 FormBuilder 创建表单并初始化表单属性
       
        /*
        this.userForm = this.fb.group({
          name: this.data.name, 
          price: '', 
          purchaseDate: '',
          imageUrl: '',
          storageLocation:'',
          isCarried:'',
          categoryName:''
        });*/

        this.userForm = this.fb.group({
          name: [this.data?.record?.name ?? '', Validators.required],
          price: [this.data?.record?.price ?? '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
          purchaseDate: [this.data?.record?.purchaseDate ?? '', Validators.required],
          imageUrl: [this.data?.record?.imageUrl ?? ''],
          storageLocation: [this.data?.record?.storageLocation ?? ''],
          isCarried: [this.data?.record?.isCarried ?? false],
          sort:[this.data?.record?.sort ?? 0],
          categoryName: [this.data?.record?.categoryName ?? '', Validators.required],
          categorySort: [this.data?.record?.categorySort ?? '', Validators.required],
        });
        
        console.log("==========================================");
        console.log(this.userForm.get('name'));
        console.log(this.userForm.get('isCarried'));
        console.log("==========================================");
        


        this.uploadService.data$.subscribe(data => this.accountIcon = data);
      }
    addData() {
      if (this.userForm.valid) {

        let user = {
          id:this.data?.record?.id ?? '',
          name: this.userForm.value.name,
          price: this.userForm.value.price,
          purchaseDate: this.userForm.value.purchaseDate,
          imageUrl: this.imagebase64,  // 将 base64 图像直接赋值给 imageUrl
          isCarried: this.userForm.value.isCarried,
          storageLocation:this.userForm.value.storageLocation,
          categoryName:this.userForm.value.categoryName,
          sort:this.userForm.value.sort,
          categorySort:this.userForm.value.categorySort,
      };

        this.lifeThingsService.postData(user).subscribe(
          (response) => {
            
            console.log(response); // Log the response data to the console
             this.dialogRef.close(this.userForm.value);
             this.lifeThingsService.triggerSelectData()

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
