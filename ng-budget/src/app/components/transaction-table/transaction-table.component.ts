import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/type-classes/transaction/transaction';
import { Category } from 'src/app/type-classes/category/category';
import { Account } from 'src/app/type-classes/account/account';

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

    accounts: Array<Account> = new Array<Account>();
    categories: Array<Category> = new Array<Category>();

    newDate: Date;
    newAmount: number;
    newAccount: number;
    newCategory: string;
    newDescription: string;

    constructor(private router: Router) { }
    ngOnInit() {
        let sact = JSON.parse(sessionStorage.getItem("transactions"))
        this.transactions = sact != null ? sact : new Array<Transaction>();
        this.accounts = JSON.parse(sessionStorage.getItem("accounts"));
        this.categories = JSON.parse(sessionStorage.getItem("categories"));
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

    addTransaction(): void {
        let answer: boolean = true;
        if (this.newDate == null || this.newAmount == null || this.newAccount == null || this.newCategory == null || this.newDescription == null) {
            answer = confirm("Are you sure you want to add this Transaction?");
        }
        if (answer) {
            let newTransaction = new Transaction();
            newTransaction.date = this.newDate;
            newTransaction.amount = this.newAmount;
            newTransaction.account = this.newAccount;
            newTransaction.category = this.newCategory;
            newTransaction.description = this.newDescription;
            this.transactions.push(newTransaction);
            this.newDate = null;
            this.newAmount = null;
            this.newAccount = null;
            this.newCategory = null;
            this.newDescription = null;
            this.table.renderRows();
            sessionStorage.setItem("transactions", JSON.stringify(this.transactions));
        }
    }

    updateTransactions(): void {
        sessionStorage.setItem("transactions", JSON.stringify(this.transactions));
    }

    deleteTransaction(): void {
        if (confirm("Are you sure you want to delete this Category?")) {
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
        return a.account - b.account;
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
