import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Transaction } from 'src/app/type-classes/transaction/transaction';
import { MatDialog } from '@angular/material/dialog';
import { Transfer } from 'src/app/type-classes/transfer/transfer';
import { NewTransferDialogComponent } from 'src/app/modals/new-transfer-dialog/new-transfer-dialog.component';
import { NewTransactionDialogComponent } from 'src/app/modals/new-transaction-dialog/new-transaction-dialog.component';

@Component({
    selector: 'app-transaction-table',
    templateUrl: './transaction-table.component.html',
    styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit {
    displayedColumns: string[] = ["select", "date", "amount", "account", "category", "description"];
    transactions: Array<Transaction> = new Array<Transaction>();
    selection: SelectionModel<Transaction> = new SelectionModel<Transaction>(true, []);
    @ViewChild(MatTable, { static: true }) table: MatTable<Transaction>;

    constructor(public dialog: MatDialog) { }
    ngOnInit() {
        let sact = JSON.parse(sessionStorage.getItem("transactions"))
        this.transactions = sact != null ? sact : new Array<Transaction>();
    }

    isAllSelected(): Boolean {
        const numSelected: Number = this.selection.selected.length;
        const numRows: Number = this.transactions.length;
        return numSelected == numRows;
    }

    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.transactions.forEach(row => this.selection.select(row));
    }

    newTransfer(): void {
        const dialogRef = this.dialog.open(NewTransferDialogComponent, {
            width: '40%',
        });
        dialogRef.afterClosed().subscribe(newTransfer => {
            if (newTransfer != null) {
                this.fillTransfer(newTransfer);
            }
        })
    }

    fillTransfer(newTransfer: Transfer): void {
        newTransfer.to.date = newTransfer.from.date;
        newTransfer.to.amount = Math.abs(newTransfer.from.amount);
        newTransfer.to.category = "Transfer";
        newTransfer.from.category = "Transfer";
        newTransfer.to.description = newTransfer.from.description;
        this.addTransaction(newTransfer.from);
        this.addTransaction(newTransfer.to);
    }

    newTransaction(): void {
        const dialogRef = this.dialog.open(NewTransactionDialogComponent, {
            width: '40%',
            data: {
                date: null,
                amount: null,
                account: null,
                category: null,
                description: null
            }
        });
        dialogRef.afterClosed().subscribe(newTransaction => {
            if (newTransaction != null) {
                this.addTransaction(newTransaction);
            }
        })
    }

    addTransaction(newTransaction: Transaction): void {
        let answer: boolean = true;
        if (newTransaction.date == null ||
            newTransaction.amount == null ||
            newTransaction.account == null ||
            newTransaction.category == null ||
            newTransaction.description == null
        ) {
            answer = confirm("Are you sure you want to add this Transaction?");
        }
        if (answer) {
            this.transactions.push(newTransaction);
            this.table.renderRows();
            sessionStorage.setItem("transactions", JSON.stringify(this.transactions));
        }
    }

    updateTransactions(): void {
        sessionStorage.setItem("transactions", JSON.stringify(this.transactions));
    }

    deleteTransaction(): void {
        if (confirm("Are you sure you want to delete this Transaction?")) {
            this.transactions = this.transactions.filter(elt => !this.selection.selected.includes(elt));
            this.selection.clear();
            this.table.renderRows();
            sessionStorage.setItem("transactions", JSON.stringify(this.transactions));
        }
    }

    sortTransaction(event): void {
        switch (event.active) {
            case "date": this.transactions = this.transactions.sort(this.dateSort);
                break;
            case "amount": this.transactions = this.transactions.sort(this.amountSort);
                break;
            case "account": this.transactions = this.transactions.sort(this.accountSort);
                break;
            case "category": this.transactions = this.transactions.sort(this.categorySort);
                break;
            default: console.log("Invalid sort parameter");
        }
        if (event.direction == "asc") {
            this.transactions = this.transactions.reverse();
        }
        this.table.renderRows();
    }

    dateSort(a: Transaction, b: Transaction): number {
        if (a.date < b.date) {
            return -1;
        } else if (a.date > b.date) {
            return 1;
        } else {
            return 0;
        }
    }

    amountSort(a: Transaction, b: Transaction): number {
        return a.amount - b.amount;
    }

    accountSort(a: Transaction, b: Transaction): number {
        if (a.account < b.account) {
            return -1;
        } else if (a.account > b.account) {
            return 1;
        } else {
            return 0;
        }
    }

    categorySort(a: Transaction, b: Transaction): number {
        if (a.category < b.category) {
            return -1;
        } else if (a.category > b.category) {
            return 1;
        } else {
            return 0;
        }
    }
}
