import { Component, OnInit, Inject } from '@angular/core';
import { Account } from 'src/app/type-classes/account/account';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-new-account-dialog',
    templateUrl: './new-account-dialog.component.html',
    styleUrls: ['./new-account-dialog.component.css']
})
export class NewAccountDialogComponent implements OnInit {
    ngOnInit(): void { }

    constructor(
        public dialogRef: MatDialogRef<NewAccountDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public account: Account
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
