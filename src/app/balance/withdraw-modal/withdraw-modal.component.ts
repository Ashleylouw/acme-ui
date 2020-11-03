import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from 'src/app/services/account.service';

@Component({
  selector: 'app-withdraw-modal',
  templateUrl: './withdraw-modal.component.html',
  styleUrls: ['./withdraw-modal.component.css']
})
export class WithdrawModalComponent {

  amount: number;
  maxExceeded = false;

  constructor(
    public dialogRef: MatDialogRef<WithdrawModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction
  ) { }

  /** Closes dialog */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /** Closes dialogs if condition passes otherwise setsmax exceeded to true */
  update(): void {
    if (this.amount < this.getMax()) {
      this.dialogRef.close(this.amount);
    } else {
      this.maxExceeded = true;
    }
  }

  /** Returns the input field max based on account type */
  getMax(): number {
    if (this.data && this.data.balance) {
        if (this.data.account_type === 'savings') {
          return Number(this.data.balance);
        } else {
          return Number(this.data.balance) + 500;
        }
    }
  }
}
