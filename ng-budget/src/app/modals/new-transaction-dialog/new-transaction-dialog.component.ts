import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from 'src/app/type-classes/transaction/transaction';
import { Category } from 'src/app/type-classes/category/category';
import { Account } from 'src/app/type-classes/account/account';

@Component({
    selector: 'app-new-transaction-dialog',
    templateUrl: './new-transaction-dialog.component.html',
    styleUrls: ['./new-transaction-dialog.component.css']
})
export class NewTransactionDialogComponent implements OnInit {
    accounts: Array<Account>;
    categories: Array<Category>;

    income: boolean;

    ngOnInit(): void {
        this.accounts = JSON.parse(sessionStorage.getItem("accounts"));
        this.categories = JSON.parse(sessionStorage.getItem("categories"));
    }

    constructor(
        public dialogRef: MatDialogRef<NewTransactionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public transaction: Transaction
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
