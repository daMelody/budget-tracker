import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from "@angular/material/sort";
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
    displayedColumns: string[] = ["select", "number", "name", "value"];
    accounts: Array<Account> = new Array<Account>();
    selection: SelectionModel<Account> = new SelectionModel<Account>(true, []);
    @ViewChild(MatTable,{static: true}) table: MatTable<any>;

    newNumber: number;
    newName: string;
    newValue: number;

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

    genNumber():  number {
        if (this.accounts.length <= 0) {
            return 0;
        } else {
            let x: number = this.accounts[this.accounts.length-1].number;
            return x.valueOf() + 1;
        }
    }

    addAccount(): void {
        let newAccount: Account = new Account();
        newAccount.number = this.genNumber();
        newAccount.name = this.newName;
        newAccount.value = this.newValue == null ? 0 : this.newValue;
        this.accounts.push(newAccount);
        this.newName = null;
        this.newValue = null;
        this.table.renderRows();
    }

    deleteAccount(): void {
        let temp: Array<number> = new Array<number>();
        this.accounts = this.accounts.filter(elt => !this.selection.selected.includes(elt));
        this.selection.clear();
        this.table.renderRows();
    }

    // TODO: finish account sorting
    sortAccounts(): void {
        this.accounts = this.accounts.sort();

        this.table.renderRows();
    }
}
