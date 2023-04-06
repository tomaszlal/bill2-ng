import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignerModule } from '../material-designer/material-designer.module';
import { LoginComponent } from './login/login.component';
import { EditcategoryComponent } from './dialog/editcategory/editcategory.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BillComponent } from './bill/bill.component';
import { AddbillComponent } from './dialog/addbill/addbill.component';
import { registerLocaleData } from '@angular/common';

//do waluty polskiej i lokalizacji
import localePL from '@angular/common/locales/pl';
import { DeletebillComponent } from './dialog/deletebill/deletebill.component';
import { ViewbillComponent } from './dialog/viewbill/viewbill.component';
registerLocaleData(localePL);


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    LoginComponent,
    EditcategoryComponent,
    BillComponent,
    AddbillComponent,
    DeletebillComponent,
    ViewbillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialDesignerModule

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl' },
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
