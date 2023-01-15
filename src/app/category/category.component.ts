import { HttpBackend } from '@angular/common/http';
import { Component, Host, HostListener, OnInit } from '@angular/core';
import { PaymentCategory } from '../model/data-model';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  //responsive variables
  colsGrid:number = 3;
  colspan:number[] = [1, 2, 3];

  //data source
  paymentCatagories:Array<PaymentCategory> = new Array<PaymentCategory>();
  // displayedColumns: string[] = [ 'name'];
  displayedColumns: string[] = [ 'name', 'recipient', 'account'];



  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.onWindowResize();
    this.getCategories();
  }

  //nasłuchuje zmiany rozmiaru ekranu
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    // console.log(window.innerWidth);
    if (window.innerWidth< 992){
      this.colsGrid = 1;
      this.colspan = [1,1,1];
    }else {
      this.colsGrid = 3;
      this.colspan = [1,2,3];
    }
  }

  getCategories():void{
    this.httpService.getCategories().subscribe(categories =>{
      this.paymentCatagories = categories;
      console.log(this.paymentCatagories);
    })
  }
}
