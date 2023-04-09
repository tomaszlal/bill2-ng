import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddbillComponent } from '../dialog/addbill/addbill.component';
import { DeletebillComponent } from '../dialog/deletebill/deletebill.component';
import { Bill, AccountNumber, PaymentCategory } from '../model/data-model';
import { HttpService } from '../service/http.service';
import { ViewbillComponent } from '../dialog/viewbill/viewbill.component';
import { EditbillComponent } from '../dialog/editbill/editbill.component';
import { PaybillComponent } from '../dialog/paybill/paybill.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  //data source
  billList: MatTableDataSource<Bill> = new MatTableDataSource<Bill>();
  displayedColumns: string[] = ['category', 'invoiceNumber', 'dateOfIssue', 'dateOfPayment', 'amount', 'dueDate', 'wasPaid', 'action'];
  pageSizeOpt = [5, 10];
  paymentCategories: Array<PaymentCategory> = new Array();
  searchedKey: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();


  constructor(private httpService: HttpService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBills();
    this.getCategories();

  }

  ngAfterViewInit() {

  }

  //nasłuchuje zmiany rozmiaru ekranu
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    if (window.innerWidth > 1000) {
      this.displayedColumns = ['category', 'invoiceNumber', 'dateOfIssue', 'dateOfPayment', 'amount', 'dueDate', 'wasPaid', 'action'];
    } else if (window.innerWidth < 760) {
      this.displayedColumns = ['category', 'dateOfPayment', 'amount', 'wasPaid', 'action'];
    }
    else {
      this.displayedColumns = ['category', 'invoiceNumber', 'dateOfPayment', 'amount', 'wasPaid', 'action'];
    }
  }

  //get all bills from db
  public getBills() {

    this.httpService.getBills().subscribe(bills => {
      this.billList = new MatTableDataSource(bills);
      this.billList.sort = this.sort;
      this.billList.paginator = this.paginator;

      // console.log(this.billList);
    })
  }

  public getBillsByCategory(categoryId: number): void {
    console.log("pobierze categorie o id: " + categoryId);
    this.httpService.getBillsByCategory(categoryId).subscribe(bills => {
      // console.log(bills);
      this.billList = new MatTableDataSource(bills);
      this.billList.sort = this.sort;
      this.billList.paginator = this.paginator;
      // console.log(this.billList);
    })
  }

  public getCategories(): void {
    this.paymentCategories.length = 0; //clear category list
    this.httpService.getCategories().subscribe(categories => {
      this.paymentCategories = categories;
      // console.log(this.paymentCategories);
    })
  }

  public categoryChanged(event: any): void {
    // console.log(event);
    if (event.value == undefined) {
      // console.log("pobranie wszystkich kategorii");
      this.getBills();
      this.searchedKey = "";
    } else {
      // console.log("pobranie wszystkich bilsów zgodnie z kategorią");
      this.getBillsByCategory(event.value.id);
      this.searchedKey = "";
    }
  }

  public announceSortChange(sortState: Sort) {
    console.log(sortState);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.billList.filter = filterValue.trim().toLowerCase();

    if (this.billList.paginator) {
      this.billList.paginator.firstPage();
    }
  }

  openAddDialog() {
    console.log("open add dialog");
    const addBillDialog = this.dialog.open(AddbillComponent);

    addBillDialog.afterClosed().subscribe((result) => {
      console.log(result);

      if (result != undefined) {
        const payment: PaymentCategory = {
          id: result.paymentCategory.id,
        }
        const account: AccountNumber = {
          id: result.paymentCategory.bankAccountNumber.id,
        }

        const newBill: Bill = {
          paymentCategory: payment,
          paymentAccountNumber: account,
          invoiceNumber: result.invoiceNumber,
          amount: result.amount,
          dateOfIssue: result.dateOfIssue,
          dateOfPayment: result.dateOfPayment,
          wasPaid: false
        }
        console.log(newBill);
        this.httpService.addBill(newBill).subscribe((bill) => {
          console.log(bill);
          this.getBills();
        })

      }

    })
  }

  public deleteDialog(billToDelete: Bill): void {
    console.log(billToDelete);
    const deleteBillDialog = this.dialog.open(DeletebillComponent, { data: { billToDelete: billToDelete } });
    deleteBillDialog.afterClosed().subscribe((result) => {
      console.log(result);
      if (result.delete == true) {
        this.httpService.deleteBill(result.id).subscribe((deleted) => {
          //zostawiam w prostej postaci ale chyba trzeba zrobić formcontroller do kategorii z filtra
          //aby pobierać rachunki filtrowane po kategorii lub nie
          this.getBills()
        });
      }

    })
  }

  // wyswietlenie rachunku - podgląd
  public viewDialog(billToView: Bill): void {
    console.log("podglad rachunku dziala");
    console.log(billToView);
    const dialogRef = this.dialog.open(ViewbillComponent, { data: { bill: billToView } });
  }

  //wyświetlenie okienka zapłąć rachunek
  public payDialog(billToPay: Bill): void {
    console.log("chyba zapłąciłem");
    console.log(billToPay);
    const dialogRef = this.dialog.open(PaybillComponent, { data: { bill: billToPay } });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        const billToUpdate: Bill = {
          id: billToPay.id,
          dueDate: result.dueDate,
          wasPaid: true,
          paymentCategory : billToPay.paymentCategory,
          invoiceNumber: billToPay.invoiceNumber,
          amount: billToPay.amount,
          dateOfIssue: billToPay.dateOfIssue,
          dateOfPayment: billToPay.dateOfPayment,
          paymentAccountNumber: billToPay.paymentAccountNumber

        }
        this.httpService.updateBill(billToUpdate).subscribe(billUpdate => {
          console.log(billUpdate);
          this.getBills();
        });

      }
    });
  }

}
