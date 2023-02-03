import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountNumber, DialogDataCategory, PaymentCategory } from 'src/app/model/data-model';
import { AccountValidator } from 'src/app/service/account.validator';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {
  public formCategory: FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    recipient: new FormControl('', [Validators.required, Validators.minLength(5)]),
    accountNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{26}?$/)]),
    dateAccountStart: new FormControl(new Date)
  })

  public bankAccountNumber: AccountNumber = {}
  public paymentCategory: PaymentCategory = {
    bankAccountNumber: this.bankAccountNumber
  }

  constructor(public dialogRef: MatDialogRef<EditcategoryComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataCategory, httpService: HttpService) {
    console.log(data);
    this.formCategory.controls['categoryName'].setValue(data.paymentCategory?.name);
    this.formCategory.controls['recipient'].setValue(data.paymentCategory?.recipient);
    this.formCategory.controls['accountNumber'].setValue(data.paymentCategory?.bankAccountNumber?.accountNumber);
    this.formCategory.controls['accountNumber'].setAsyncValidators(AccountValidator.createValidator(httpService));
    this.formCategory.controls['dateAccountStart'].setValue(data.paymentCategory?.bankAccountNumber?.beginningDateValidityAccountNumber);

  }

  ngOnInit(): void {
    // this.getCategoryName.setValue(this.data.paymentCategory?.name);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  //sprawdza czy wprowadzana wartość jest cyfrą
  public onlyNumber(event: KeyboardEvent): boolean {
    let charCode = event.key;
    // wstawiaj tylko i wylacznie znaki 0-9  oraz reaguj na znaki sterujace
    if (
      (charCode.charCodeAt(0) > 47 && charCode.charCodeAt(0) < 58) ||
      charCode.charCodeAt(0) < 32
    ) {

      return true;
    } else {
      return false;
    }
  }

  public pasteAccounFieldUpdate(event: any): void {
    setTimeout(()=>{
      // console.log(this.getAccountNumber);
      let accountNumber : string = this.formCategory.controls['accountNumber'].value;
      accountNumber = accountNumber.replace(/[^0-9]/g, '');
      // console.log(accountNumber);
      this.formCategory.controls['accountNumber'].setValue(accountNumber);
    },200);
  }

  public updatePaymentCategory(){
    this.paymentCategory.name = this.formCategory.controls['categoryName'].value;
    this.paymentCategory.recipient = this.formCategory.controls['recipient'].value;
    this.bankAccountNumber.accountNumber= this.formCategory.controls['accountNumber'].value;
    if (this.formCategory.controls['dateAccountStart'].value == this.data.paymentCategory?.bankAccountNumber?.beginningDateValidityAccountNumber){
      console.log("daty te same");
      this.bankAccountNumber.beginningDateValidityAccountNumber = this.formCategory.controls['dateAccountStart'].value;
    } else {
      console.log("daty te different");
      let d :Date = this.formCategory.controls['dateAccountStart'].value;
      let dataAccount = new Date(d.getFullYear(),d.getMonth(),d.getDate(), d.getHours()+4 );// dodanie 1 godziny bo wyświetlał dzień wczesniejszy
      this.bankAccountNumber.beginningDateValidityAccountNumber = dataAccount;
    }


  }


}
