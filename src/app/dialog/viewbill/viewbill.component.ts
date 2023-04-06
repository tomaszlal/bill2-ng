import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bill, DialogDataBill } from 'src/app/model/data-model';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-viewbill',
  templateUrl: './viewbill.component.html',
  styleUrls: ['./viewbill.component.css']
})
export class ViewbillComponent implements OnInit {

  billToView:Bill = {}

  // public formViewBill: FormGroup = new FormGroup({
  //   category: new FormControl(''),

  // })

  constructor(public dialogRef: MatDialogRef<ViewbillComponent>, @Inject(MAT_DIALOG_DATA) public data: any, httpSesvice : HttpService) {
    console.log(data);
    this.billToView = data.bill;

  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
