import { Component, OnInit } from "@angular/core";
import { Transaction } from "../type-classes/transaction/transaction";
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: "app-transaction-table",
    templateUrl: "./transaction-table.component.html",
    styleUrls: ["./transaction-table.component.css"]
})
export class TransactionTableComponent implements OnInit {
    constructor() { }
    ngOnInit() { }

    displayedColumns: String[] = [
        "date",
        "amount",
        "account",
        "type",
        "description"
    ];
    transactions: MatTableDataSource<Transaction>;

    initialSelection = [];
    allowMultiSelect = true;
    selection = new SelectionModel<Transaction>(this.allowMultiSelect, this.initialSelection);

    isAllSelected(): Boolean {
        const numSelected: Number = this.selection.selected.length;
        const numRows: Number = this.transactions.data.length;
        return numSelected == numRows;
    }

    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.transactions.data.forEach(row => this.selection.select(row));
    }

    newDate: Date;
    newAmount: number;
    newAccount: number;
    newType: string;
    newDescription: string;

    addTransaction(): void {
        let newTransaction = new Transaction();
        newTransaction.date = this.newDate;
        newTransaction.amount = this.newAmount;
        newTransaction.account = this.newAccount;
        newTransaction.type = this.newType;
        newTransaction.description = this.newDescription;
        this.transactions.data.push(newTransaction);
    }
}
