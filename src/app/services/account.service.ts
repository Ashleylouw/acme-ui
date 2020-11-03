import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Transaction {
  account_number: string;
  account_type: 'savings' | 'cheque';
  balance: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(public http: HttpClient) { }

  /** Gets all transaction details from api */
  getAccounts(): Promise<Transaction[]> {
      return this.http.get<Transaction[]>('http://localhost:8080/api/accounts').toPromise();
  }

  /** Updates the transaction on ui */
  updateAccountBalance(transactions: Transaction[], selectedTransaction: Transaction, withdrawedAmount: number): Transaction[] {
    return transactions.map(item => {
      if (item.account_number === selectedTransaction.account_number) {
       item.balance = (Number(item.balance) - withdrawedAmount).toFixed(2).toString();
       return item;
      }
      return item;
    });
  }
}
