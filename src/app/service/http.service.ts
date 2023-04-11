import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountNumber, Bill, PaymentCategory } from '../model/data-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // apiUrl:string = 'http://localhost:9494';    // ZAMIENIONO NA ENVIROMENT

  constructor(private http:HttpClient) { }

  //pobranie wszystkich categorii
  public getCategories():Observable<Array<PaymentCategory>>{
    return this.http.get<Array<PaymentCategory>>(environment.apiUrl+'/get/categories');
  }

  //dodanie nowego numeru rachunku
  public addBankAccount(accountNumber:AccountNumber) : Observable<AccountNumber> {
    return this.http.post<AccountNumber>(environment.apiUrl+"/add/bankaccountnumber",accountNumber);
  }

  //update bank account
  public updateBankAccount(accountNumber:AccountNumber) : Observable<AccountNumber>{
    return this.http.put<AccountNumber>(environment.apiUrl+"/update/bankaccountnumber",accountNumber);
  }

  //dodanie nowej kategorii płatności
  public addPaymentCategory(category:PaymentCategory) : Observable<PaymentCategory> {
    return this.http.post<PaymentCategory>(environment.apiUrl+"/add/category",category);
  }

  //update kategorii płatności
  public updatePaymentCategory(category:PaymentCategory) : Observable<PaymentCategory> {
    return this.http.put<PaymentCategory>(environment.apiUrl+"/update/category",category);
  }

  //sprawdzenie w rest api poprawności konta nbankowego
  public checkAccountNumber(accNum: string): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + '/accountcheck/' + accNum);
  }

  //pobranie wszystkich rachunkow
  public getBills(): Observable<Array<Bill>> {
    return this.http.get<Array<Bill>>(environment.apiUrl+"/get/bill");
  }

  public getBillsByCategory(categoryId: number): Observable<Array<Bill>> {
    return this.http.get<Array<Bill>>(environment.apiUrl+"/get/bill/"+categoryId);
  }

  public addBill(bill:Bill): Observable<Bill> {
    return this.http.post<Bill>(environment.apiUrl+"/add/bill", bill);
  }

  public deleteBill(billId: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl+"/del/bill/"+billId);
  }

  //update rachunku
  public updateBill(bill:Bill): Observable<Bill>{
    return this.http.put<Bill>(environment.apiUrl+"/update/bill", bill);
  }
}
