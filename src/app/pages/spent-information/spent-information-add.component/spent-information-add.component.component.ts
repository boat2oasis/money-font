import { Component,OnInit } from '@angular/core';
import { SpentInformation } from '../SpentInformation'; 
import { FormGroup,FormBuilder } from '@angular/forms';
import { SpentInformationService } from '../spent-information.service';
import { AccountDataService } from '../../account/account.data.service';
import { MatDialogRef } from '@angular/material/dialog';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'ngx-spent-information-add.component',
  templateUrl: './spent-information-add.component.component.html',
  styleUrls: ['./spent-information-add.component.component.scss']
})
export class SpentInformationAddComponentComponent implements OnInit{
  displayedColumns: string[] = ['position', 'AcountName', 'Balance', 'Icon',"createAt"];
  spentInformation: SpentInformation; 
  userForm: FormGroup;  // 表单
  usedFor: Food[] = [
    {value: '1', viewValue: '食物'},
    {value: '2', viewValue: '饮水'},
    {value: '3', viewValue: '用'},
    {value: '4', viewValue: '交通'},
    {value: '5', viewValue: '话费网费'},
    {value: '6', viewValue: '水费'},
    {value: '7', viewValue: '电费'},
    {value: '8', viewValue: '房租'},
    {value: '9', viewValue: '休闲娱乐'}
  ];




  accountList: Food[];
  constructor(private fb: FormBuilder,
    private spentInformationService:SpentInformationService,
    private dialogRef: MatDialogRef<SpentInformationAddComponentComponent>
  ,private accoutService:AccountDataService) {}
  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: '', 
      spentDate: '', 
      productServiceName: '',
      pricees: '', 
      usedForName: '',

      usedFor: '',
      accountId:'',
      
      couldSave:''
  });
  this.selectAccountData();
  }

  selectAccountData(){
    this.accoutService.selectData().subscribe(
      (response) => {
        
        let dataSource = response.data;
        this.accountList=dataSource.map((item)=>{
          return {
            value: item.id, viewValue: item.accountName
          }
        })
      },
      (error) => {
        
        console.log(error);
      },
    )
  }

  addData() {
    
    if (this.userForm.valid) {

      this.spentInformation = new SpentInformation(
        this.userForm.value.id,
        this.userForm.value.spentDate,
        this.userForm.value.productServiceName,
  
        this.userForm.value.pricees,

        this.userForm.value.usedFor,
        this.userForm.value.accountId,

        
        this.userForm.value.couldSave,

      );
  
      this.spentInformationService.postData(this.spentInformation).subscribe(
        (response) => {
          
          console.log(response); // Log the response data to the console
          this.spentInformationService.triggerSelectData()
          this.dialogRef.close(this.userForm.value);
          
        },
        (error) => {
          
          console.error('Error fetching data:', error); // Log any errors
        }
      );
    }
  }
}
