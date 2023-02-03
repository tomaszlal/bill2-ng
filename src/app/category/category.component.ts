import { Component, Host, HostListener, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditcategoryComponent } from '../dialog/editcategory/editcategory.component';
import { AccountNumber, PaymentCategory } from '../model/data-model';
import { AccountValidator } from '../service/account.validator';

import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  //responsive variables
  colsGrid: number = 3;
  colspan: number[] = [1, 2, 3];

  //data source
  paymentCatagories: Array<PaymentCategory> = new Array<PaymentCategory>();
  displayedColumns: string[] = ['name', 'recipient', 'account', 'action'];

  //form add category payment
  public formCategory: FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    accountNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{26}?$/)], [AccountValidator.createValidator(this.httpService)]),
    recipient: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  //zmienna do pola formularza accountNumber
  isCorrectAccountNumber = false;


  constructor(private httpService: HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.onWindowResize();
    this.getCategories();
    console.log(this.formCategory);

  }



  //nasłuchuje zmiany rozmiaru ekranu
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    // console.log(window.innerWidth);
    if (window.innerWidth < 992) {
      this.colsGrid = 1;
      this.colspan = [1, 1, 1];
    } else {
      this.colsGrid = 3;
      this.colspan = [1, 2, 3];
    }
  }

  getCategories(): void {
    this.paymentCatagories.length = 0; //clear category list
    this.httpService.getCategories().subscribe(categories => {
      this.paymentCatagories = categories;
      console.log(this.paymentCatagories);
    })
  }


  //sprawdza czy wprowadzana wartość jest cyfrą
  public onlyNumber(event: KeyboardEvent): boolean {
    let charCode = event.key;
    // wstawiaj tylko i wylacznie znaki 0-9  oraz reaguj na znaki sterujace
    if (
      (charCode.charCodeAt(0) > 47 && charCode.charCodeAt(0) < 58) ||
      charCode.charCodeAt(0) < 32
    ) {

      return true;
    } else {
      return false;
    }
  }

  //wstawia  "paste" znaki - tylko cyfry
  public pasteAccounFieldUpdate(event: any): void {
    setTimeout(() => {
      // console.log(this.getAccountNumber);
      let accountNumber: string = this.getAccountNumber?.value;
      accountNumber = accountNumber.replace(/[^0-9]/g, '');
      // console.log(accountNumber);
      this.getAccountNumber?.setValue(accountNumber);
    }, 200);
  }


  //dodanie nowej kategorii platnosci i zapisanie nowego rachynku
  public addPaymentCategory() {
    const accountNumber: AccountNumber = {
      accountNumber: this.getAccountNumber?.value
    }

    this.httpService.addBankAccount(accountNumber).subscribe(account => {
      const paymentCategory: PaymentCategory = {
        name: this.getCategoryName?.value,
        recipient: this.getRecipient?.value,
        bankAccountNumber: {
          id: account.id,
        }
      }
      this.httpService.addPaymentCategory(paymentCategory).subscribe(category => {
        console.log(category);
        this.getCategories();
        this.getAccountNumber?.setValue("");
        this.getCategoryName?.setValue("");
        this.getRecipient?.setValue("");
        this.formCategory.reset();
        this.formCategory.markAsUntouched();
        console.log(this.formCategory);
      })



      // console.log(account);
    })
  }

  //edycja categrorri uruchomienie okna dialogowego
  public editPaymentCategory(category: PaymentCategory) {
    console.log(category);
    const dialogRef = this.dialog.open(EditcategoryComponent, { data: { paymentCategory: category } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != undefined) {
        if (result.bankAccountNumber.accountNumber != category.bankAccountNumber?.accountNumber)
        // || result.bankAccountNumber.beginningDateValidityAccountNumber != category.bankAccountNumber?.beginningDateValidityAccountNumber)
        {
          const account: AccountNumber = {
            accountNumber: result.bankAccountNumber.accountNumber,
            beginningDateValidityAccountNumber: result.bankAccountNumber.beginningDateValidityAccountNumber
          }
          this.httpService.addBankAccount(account).subscribe(accNum => {
            const paymentCategoryToUpdate: PaymentCategory = {
              id: category.id,
              name: result.name,
              recipient: result.recipient,
              bankAccountNumber: accNum
            }
            this.httpService.updatePaymentCategory(paymentCategoryToUpdate).subscribe(cat => {
              console.log(cat);
              this.getCategories();
            })
          })
        } else {
          // jesli nie zmieniono nr banku
          {
            const account: AccountNumber = {
              id: category.bankAccountNumber?.id,
              accountNumber: category.bankAccountNumber?.accountNumber,
              beginningDateValidityAccountNumber: result.bankAccountNumber.beginningDateValidityAccountNumber
            }
            this.httpService.updateBankAccount(account).subscribe(accNum => {
              console.log(accNum);
            })
          }
          {
            const paymentCategoryToUpdate: PaymentCategory = {
              id: category.id,
              name: result.name,
              recipient: result.recipient,
              bankAccountNumber: category.bankAccountNumber

            }
            this.httpService.updatePaymentCategory(paymentCategoryToUpdate).subscribe(cat => {
              console.log(cat);
              this.getCategories();
            })
          }
        }
      }
    })

  }



  //getters to get payment

  public get getCategoryName() {
    return this.formCategory.get('categoryName');
  }

  public get getAccountNumber() {
    return this.formCategory.get('accountNumber');
  }

  public get getRecipient() {
    return this.formCategory.get('recipient');
  }
}
