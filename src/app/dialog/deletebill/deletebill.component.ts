import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bill } from 'src/app/model/data-model';

@Component({
  selector: 'app-deletebill',
  templateUrl: './deletebill.component.html',
  styleUrls: ['./deletebill.component.css']
})
export class DeletebillComponent implements OnInit {

  billToDelete:Bill = {}
  panelOpenState = false;
  deleteBill = {
    delete:false,
    id:0
  }

  constructor(public dialogRef: MatDialogRef<DeletebillComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
      this.billToDelete = data.billToDelete;
   }

  ngOnInit(): void {
    console.log(this.billToDelete);
  }

  removeBill(): void {
    this.deleteBill.delete = true;
    this.deleteBill.id = this.billToDelete.id?this.billToDelete.id:0;
  }

}
