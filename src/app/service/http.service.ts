import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentCategory } from '../model/data-model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl:string = 'http://localhost:9494';

  constructor(private http:HttpClient) { }


  public getCategories():Observable<Array<PaymentCategory>>{
    return this.http.get<Array<PaymentCategory>>(this.apiUrl+'/get/categories');
  }
}
