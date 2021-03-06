import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Account } from 'src/app/type-classes/account/account';
import { MatDialog } from '@angular/material/dialog';
import { NewAccountDialogComponent } from 'src/app/modals/new-account-dialog/new-account-dialog.component';


@Component({
    selector: 'app-account-manager',
    templateUrl: './account-manager.component.html',
    styleUrls: ['./account-manager.component.css']
})
export class AccountManagerComponent implements OnInit {
    displayedColumns: string[] = ["select", "name", "value"];
    accounts: Array<Account>;

    selection: SelectionModel<Account> = new SelectionModel<Account>(true, []);
    @ViewChild(MatTable, { static: true }) table: MatTable<Account>;


    constructor(public dialog: MatDialog) { }
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

    newAccount(): void {
        const dialogRef = this.dialog.open(NewAccountDialogComponent, {
            width: '40%',
            data: { name: '', value: 0 }
        });
        dialogRef.afterClosed().subscribe(newAccount => {
            if (newAccount != null) {
                this.addAccount(newAccount)
            }
        });
    }

    addAccount(newAccount: Account): void {
        let answer: boolean = true;
        if (newAccount.name === null) {
            answer = confirm("Are you sure you want to add this Acount?");
        }
        if (answer) {
            newAccount.value = newAccount.value == null ? 0 : newAccount.value;
            this.accounts.push(newAccount);
            this.table.renderRows();
            sessionStorage.setItem("accounts", JSON.stringify(this.accounts));
        }
    }

    updateAccounts(): void {
        sessionStorage.setItem("accounts", JSON.stringify(this.accounts));
    }

    deleteAccount(): void {
        if (confirm("Are you sure you want to delete this Category?")) {
            this.accounts = this.accounts.filter(elt => !this.selection.selected.includes(elt));
            this.selection.clear();
            sessionStorage.setItem("accounts", JSON.stringify(this.accounts));
            this.table.renderRows();
        }
    }

    sortAccounts(event): void {
        switch (event.active) {
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
