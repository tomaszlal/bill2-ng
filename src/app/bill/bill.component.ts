import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddbillComponent } from '../dialog/addbill/addbill.component';
import { Bill ,AccountNumber, PaymentCategory } from '../model/data-model';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  //data source
  billList: MatTableDataSource<Bill>  = new MatTableDataSource<Bill>();
  displayedColumns: string[] = ['category', 'invoiceNumber','dateOfIssue'];
  pageSizeOpt = [ 5 , 10];

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();


  constructor(private httpService:HttpService,private _liveAnnouncer: LiveAnnouncer,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBills();

  }

  ngAfterViewInit() {

  }

  //get all bills from db
  public getBills() {

    this.httpService.getBills().subscribe(bills =>{
      this.billList = new MatTableDataSource(bills);
      this.billList.sort = this.sort;
      this.billList.paginator = this.paginator;

      console.log(this.billList);
    })
  }

  public announceSortChange(sortState: Sort){
    console.log(sortState);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.billList.filter = filterValue.trim().toLowerCase();

    if (this.billList.paginator) {
      this.billList.paginator.firstPage();
    }
  }

  openAddDialog(){
    console.log("open add dialog");
    const addBillDialog = this.dialog.open(AddbillComponent);

    addBillDialog.afterClosed().subscribe((result) =>{
      console.log(result);
      const payment:PaymentCategory = {
        id: result.paymentCategory.id,
      }
      const account: AccountNumber = {
        id: result.paymentCategory.bankAccountNumber.id,
      }

      const newBill:Bill = {
        paymentCategory: payment,
        paymentAccountNumber: account,
        invoiceNumber: result.invoiceNumber,
        amount: result.amount,
        dateOfIssue: result.dateOfIssue,
        dateOfPayment: result.dateOfPayment,
        wasPaid: false
      }
      console.log(newBill);
      this.httpService.addBill(newBill).subscribe((bill)=>{
        console.log(bill);

      })

    })
  }

}
