import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Account } from 'src/app/type-classes/account/account';

@Component({
    selector: 'app-account-manager',
    templateUrl: './account-manager.component.html',
    styleUrls: ['./account-manager.component.css']
})
export class AccountManagerComponent implements OnInit {
    displayedColumns: string[] = ["select", "number", "name", "value"];
    accounts: Array<Account>;
    selection: SelectionModel<Account> = new SelectionModel<Account>(true, []);
    @ViewChild(MatTable, { static: true }) table: MatTable<Account>;

    newNumber: number;
    newName: string;
    newValue: number;

    constructor(private router: Router) { }
    ngOnInit(): void {
        let acc = JSON.parse(sessionStorage.getItem("accounts"));
        this.accounts = acc != null ? acc : new Array<Account>();
    }

    /* for SELECTION */

    isAllSelected(): Boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.accounts.length;
        return numSelected === numRows;
    }

    masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.accounts.forEach(row => this.selection.select(row));
    }

    genNumber(): number {
        let max: number = 0;
        if (this.accounts.length <= 0) return 0;
        for (let i = 0; i < this.accounts.length; i++) {
            if (max < this.accounts[i].number) max = this.accounts[i].number;
        }
        return max + 1;
    }

    addAccount(): void {
        let answer: boolean = true;
        if (this.newName == null) {
            answer = confirm("Are you sure you want to add this Acount?");
        }
        if (answer) {
            let newAccount: Account = new Account();
            newAccount.number = this.genNumber();
            newAccount.name = this.newName;
            newAccount.value = this.newValue == null ? 0 : this.newValue;
            this.accounts.push(newAccount);
            this.newName = null;
            this.newValue = null;
            this.table.renderRows();
            sessionStorage.setItem("accounts", JSON.stringify(this.accounts));
        }
    }

    deleteAccount(): void {
        if (confirm("Are you sure you want to delete this Category?")) {
            this.accounts = this.accounts.filter(elt => !this.selection.selected.includes(elt));
            this.selection.clear();
            this.table.renderRows();
            sessionStorage.setItem("accounts", JSON.stringify(this.accounts));
        }
    }

    sortAccounts(event): void {
        switch (event.active) {
            case "number": this.accounts = this.accounts.sort(this.numberSort);
                break;
            case "name": this.accounts = this.accounts.sort(this.nameSort);
                break;
            case "value": this.accounts = this.accounts.sort(this.valueSort);
                break;
            default: console.log("Invalid sort parameter");
        }
        if (event.direction == "asc") {
            this.accounts = this.accounts.reverse();
        }
        this.table.renderRows();
    }

    /* SORTING methods for each sortable Account field */

    numberSort(a: Account, b: Account): number {
        return a.number - b.number;
    }

    nameSort(a: Account, b: Account): number {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    }

    valueSort(a: Account, b: Account): number {
        return a.value - b.value;
    }
}
