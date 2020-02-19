import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from "@angular/cdk/collections";
import { Account } from "../type-classes/account/account";


@Component({
    selector: "app-account-manager",
    templateUrl: "./account-manager.component.html",
    styleUrls: ["./account-manager.component.css"]
})
export class AccountManagerComponent implements OnInit {
    displayedColumns: String[] = ["select", "number", "name", "value"];
    accounts: MatTableDataSource<Account> = new MatTableDataSource<Account>();
    selection: SelectionModel<Account> = new SelectionModel<Account>(true, []);

    newNumber: Number;
    newName: String;
    newValue: Number;

    constructor() { }
    ngOnInit() {
        this.newNumber = this.accounts.data.length;
    }

    isAllSelected(): Boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.accounts.data.length;
        return numSelected === numRows;
    }


    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.accounts.data.forEach(row => this.selection.select(row));
    }

    addAccount(): void {
        let newAccount: Account = new Account();
        newAccount.number = this.newNumber;
        newAccount.name = this.newName;
        newAccount.value = this.newValue;
        this.accounts.data.push(newAccount);
        this.accounts.connect();
        console.log(this.accounts);
    }
}
