import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { AccountType } from 'src/app/shared/models/AccountType';
import { FinancialAccount } from 'src/app/shared/models/FinancialAccount';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../pages/account/account.component';
import { AccountClassification } from 'src/app/shared/models/AccountClassification';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {

  @Input() accountTypes: Array<AccountType> = [];
  @Input() accountClassifications: Array<AccountClassification> = [];

  @Output() newAccount = new EventEmitter();
  account: FinancialAccount;

  constructor(
    public dialogRef: MatDialogRef<NewAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      this.account = data.newAccount;

      this.accountTypes = data.accountTypes;

      this.accountClassifications = data.accountClassifications;

  }

  cancelInput() {
    this.dialogRef.close();
  }

}
