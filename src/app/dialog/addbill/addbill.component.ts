import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountNumber, Bill, PaymentCategory } from 'src/app/model/data-model';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-addbill',
  templateUrl: './addbill.component.html',
  styleUrls: ['./addbill.component.css']
})
export class AddbillComponent implements OnInit {

  public bankAccountNumber: AccountNumber = {}
  public paymentCategory: PaymentCategory = {
    bankAccountNumber: this.bankAccountNumber
  }
  public bill: Bill = {
    paymentCategory: this.paymentCategory,

  }

  paymentCatagories: Array<PaymentCategory> = new Array<PaymentCategory>();

  public formAddBill: FormGroup = new FormGroup({
    categorySelect: new FormControl(this.paymentCatagories, [Validators.required]),
    invoice: new FormControl('', [Validators.required, Validators.minLength(6)]),
    amount: new FormControl('', [Validators.required, Validators.pattern(/^\d{0,10}(\.\d{1,2})?$/)]),
    dateOfIssue: new FormControl('', Validators.required),
    dateOfPayment: new FormControl('', Validators.required)
  });




  constructor(private httpService: HttpService, public dialogRef: MatDialogRef<AddbillComponent>) { }

  ngOnInit(): void {
    this.getCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCategories(): void {
    this.paymentCatagories.length = 0; //clear category list
    this.httpService.getCategories().subscribe(categories => {
      this.paymentCatagories = categories;
      console.log(this.paymentCatagories);
    })
  }

  //tylko wartości kwotowe
  public onlyNumber(event: KeyboardEvent) {
    let amount: string = this.formAddBill.controls['amount'].value;
    amount = amount.replace(/,/g, '.');
    amount = amount.replace(/[^0-9\\.]+/g, '');
    if (amount.split('.').length > 2 || amount.split('.').length > 1 && amount.split('.')[1].length > 2) {

      if(amount.split('.')[1] =="") amount = amount.slice(0, amount.split('.')[0].length+1)
      else amount = amount.slice(0, amount.split('.')[0].length+3)
    }
    this.formAddBill.controls['amount'].setValue(amount);
  }

  public sendBillToSave(){
    this.bill.paymentCategory=this.formAddBill.controls['categorySelect'].value;
    // this.bill.paymentAccountNumber = //                                           uzupełnić w bill.component
    this.bill.invoiceNumber = this.formAddBill.controls['invoice'].value;
    this.bill.amount = this.formAddBill.controls['amount'].value;
    this.bill.dateOfIssue = this.formAddBill.controls['dateOfIssue'].value;
    this.bill.dateOfPayment = this.formAddBill.controls['dateOfPayment'].value;
  }


}
