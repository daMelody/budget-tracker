import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/type-classes/category/category';
import { Account } from 'src/app/type-classes/account/account';
import { Transfer } from 'src/app/type-classes/transfer/transfer';

@Component({
    selector: 'app-new-transfer-dialog',
    templateUrl: './new-transfer-dialog.component.html',
    styleUrls: ['./new-transfer-dialog.component.css']
})
export class NewTransferDialogComponent implements OnInit {
    accounts: Array<Account>;
    categories: Array<Category>;

    ngOnInit(): void {
        this.accounts = JSON.parse(sessionStorage.getItem("accounts"));
        this.categories = JSON.parse(sessionStorage.getItem("categories"));
        this.transfer = new Transfer();
    }

    constructor(public dialogRef: MatDialogRef<NewTransferDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public transfer: Transfer) { }


    onNoClick(): void {
        this.dialogRef.close();
    }
}
