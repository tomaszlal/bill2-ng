import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditcategoryComponent } from '../editcategory/editcategory.component';
import { Bill, DialogDataBill } from 'src/app/model/data-model';
import { HttpService } from 'src/app/service/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paybill',
  templateUrl: './paybill.component.html',
  styleUrls: ['./paybill.component.css']
})
export class PaybillComponent implements OnInit {

  imageQRCodeUrl: string = environment.apiUrl+'/qrcode/';

  public formPayBill: FormGroup = new FormGroup({
    accountNumber: new FormControl('',),
    recipient: new FormControl('',),
    invoice: new FormControl('', ),
    amount: new FormControl('', ),
    dueDate: new FormControl('',Validators.required)
  });

  public bill:Bill ={

  }

  constructor(public dialogRef: MatDialogRef<EditcategoryComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataBill, httpService: HttpService) {
    console.log("dzialal okienko payau");
    console.log(data);
    this.formPayBill.controls['accountNumber'].setValue(data.bill?.paymentAccountNumber?.accountNumber);
    this.formPayBill.controls['recipient'].setValue(data.bill?.paymentCategory?.recipient);
    this.formPayBill.controls['invoice'].setValue(data.bill?.invoiceNumber);
    this.formPayBill.controls['amount'].setValue(data.bill?.amount);
    this.formPayBill.controls['dueDate'].setValue(new Date());
    this.imageQRCodeUrl = this.imageQRCodeUrl+data.bill?.id;


  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public sendUpdateBill(){
    console.log("Działa zapisz");
    this.bill.dueDate = this.formPayBill.controls['dueDate'].value;
  }

}
