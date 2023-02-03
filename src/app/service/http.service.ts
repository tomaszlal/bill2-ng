import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountNumber, Bill, PaymentCategory } from '../model/data-model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl:string = 'http://localhost:9494';

  constructor(private http:HttpClient) { }

  //pobranie wszystkich categorii
  public getCategories():Observable<Array<PaymentCategory>>{
    return this.http.get<Array<PaymentCategory>>(this.apiUrl+'/get/categories');
  }

  //dodanie nowego numeru rachunku
  public addBankAccount(accountNumber:AccountNumber) : Observable<AccountNumber> {
    return this.http.post<AccountNumber>(this.apiUrl+"/add/bankaccountnumber",accountNumber);
  }

  //update bank account
  public updateBankAccount(accountNumber:AccountNumber) : Observable<AccountNumber>{
    return this.http.put<AccountNumber>(this.apiUrl+"/update/bankaccountnumber",accountNumber);
  }

  //dodanie nowej kategorii płatności
  public addPaymentCategory(category:PaymentCategory) : Observable<PaymentCategory> {
    return this.http.post<PaymentCategory>(this.apiUrl+"/add/category",category);
  }

  //update kategorii płatności
  public updatePaymentCategory(category:PaymentCategory) : Observable<PaymentCategory> {
    return this.http.put<PaymentCategory>(this.apiUrl+"/update/category",category);
  }

  //sprawdzenie w rest api poprawności konta nbankowego
  public checkAccountNumber(accNum: string): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl + '/accountcheck/' + accNum);
  }

  //pobranie wszystkich rachunkow
  public getBills(): Observable<Array<Bill>> {
    return this.http.get<Array<Bill>>(this.apiUrl+"/get/bill");
  }

  public addBill(bill:Bill): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl+"/add/bill", bill);
  }
}
