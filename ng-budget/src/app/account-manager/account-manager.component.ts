import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTable } from '@angular/material/table';
import { SelectionModel } from "@angular/cdk/collections";
import { Account } from "../type-classes/account/account";

const SOURCE = new Array<Account>();
let newAct: Account = new Account();
newAct.number = 0;
newAct.name = "Bank of America";
newAct.value = -1000;
SOURCE.push(newAct);
let sndAct: Account = new Account();
sndAct.number = 1;
sndAct.name = "Discover";
sndAct.value = -250;
SOURCE.push(sndAct);

@Component({
    selector: "app-account-manager",
    templateUrl: "./account-manager.component.html",
    styleUrls: ["./account-manager.component.css"]
})
export class AccountManagerComponent implements OnInit {
    displayedColumns: String[] = ["select", "number", "name", "value"];
    accounts: Array<Account> = new Array<Account>();
    selection: SelectionModel<Account> = new SelectionModel<Account>(true, []);
    @ViewChild(MatTable,{static: true}) table: MatTable<any>;

    newNumber: Number;
    newName: String;
    newValue: Number;

    constructor() { }
    ngOnInit() { }

    isAllSelected(): Boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.accounts.length;
        return numSelected === numRows;
    }


    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.accounts.forEach(row => this.selection.select(row));
    }

    addAccount(): void {
        let newAccount: Account = new Account();
        newAccount.number = this.accounts.length;
        newAccount.name = this.newName;
        newAccount.value = this.newValue;
        this.accounts.push(newAccount);
        console.log(this.accounts);
        this.table.renderRows();
    }
}
