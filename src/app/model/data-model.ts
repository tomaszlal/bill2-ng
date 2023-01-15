export interface Page {
  content?:          Content[];
  pageable?:         Pageable;
  totalPages?:       number;
  totalElements?:    number;
  last?:             boolean;
  size?:             number;
  number?:           number;
  sort?:             Sort;
  numberOfElements?: number;
  first?:            boolean;
  empty?:            boolean;
}

export interface Content {
  id?:                   number;
  paymentCategory?:      PaymentCategory;
  invoiceNumber?:        string;
  amount?:               number;
  dateOfIssue?:          Date;
  dueDate?:              Date;
  dateOfPayment?:        Date;
  wasPaid?:              boolean;
  paymentAccountNumber?: AccountNumber;
}

export interface AccountNumber {
  id?:                                 number;
  accountNumber?:                      string;
  beginningDateValidityAccountNumber?: Date;
}

export interface PaymentCategory {
  id?:                number;
  name?:              string;
  recipient?:         string;
  bankAccountNumber?: AccountNumber;
}

export interface Pageable {
  sort?:       Sort;
  offset?:     number;
  pageNumber?: number;
  pageSize?:   number;
  paged?:      boolean;
  unpaged?:    boolean;
}

export interface Sort {
  empty?:    boolean;
  sorted?:   boolean;
  unsorted?: boolean;
}
