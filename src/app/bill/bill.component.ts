import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  pageSizeOpt = [1,2, 5 , 10];

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();


  constructor(private httpService:HttpService,private _liveAnnouncer: LiveAnnouncer) { }

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

}
