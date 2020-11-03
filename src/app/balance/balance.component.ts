import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService, Transaction } from '../services/account.service';
import { WithdrawModalComponent } from './withdraw-modal/withdraw-modal.component';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  displayedColumns: string[] = ['account', 'type', 'balance', 'actions'];
  transactions: Transaction[] = [];

  /** Component constructor */
  constructor(public accService: AccountService, public dialog: MatDialog) {}

  /** On component Init, subscribes to account data */
  async ngOnInit(): Promise<void> {
    try {
      const transactions = await this.accService.getAccounts();
      this.transactions = transactions;
    } catch (err) {
      console.error(err);
    }
  }

  /** Gets the total balance of all transactions. */
  getTotalBalance(): number {
    return this.transactions.map(t => Number(t.balance)).reduce((acc, value) => acc + value, 0);
  }

  /** Determines if withdraw button should be disabled */
  isDisabled(transaction: Transaction): boolean {
    return transaction.account_type === 'savings' && Number(transaction.balance) < 0 ||
            transaction.account_type !== 'savings' && Number(transaction.balance) < -500;
  }

  /** Opens a dialog that would allow for an amount to be withdrawed and when done calls update to update table dataSource */
  withdrawel(transaction: Transaction): void {
    const dialogRef = this.dialog.open(WithdrawModalComponent, {
      width: '250px',
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert('Success');
        this.transactions = this.accService.updateAccountBalance(this.transactions, transaction, result);
      }
    });
  }

}
