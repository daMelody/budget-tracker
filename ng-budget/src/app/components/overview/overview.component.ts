import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Account } from 'src/app/type-classes/account/account';
import { Category } from 'src/app/type-classes/category/category';
import { Transaction } from 'src/app/type-classes/transaction/transaction';


@Component({
    selector: "app-overview",
    templateUrl: "./overview.component.html",
    styleUrls: ["./overview.component.css"]
})
export class OverviewComponent implements OnInit {
    accounts: Array<Account> = new Array<Account>();
    categories: Array<Category> = new Array<Category>();
    transactions: Array<Transaction> = new Array<Transaction>();;

    accountMap: Map<string, Account> = new Map<string, Account>();
    categoryMap: Map<string, Category> = new Map<string, Category>();

    accountColumns: string[] = ["name", "value"];
    categoryColumns: string[] = ["name", "expected", "actual"];

    @ViewChild(MatTable, { static: true }) accountTable: MatTable<Account>;
    @ViewChild(MatTable, { static: true }) categoryTable: MatTable<Category>;

    constructor() { }
    ngOnInit(): void {
        this.accounts = JSON.parse(sessionStorage.getItem("accounts"));
        this.accounts != null ? this.accounts.forEach(acc => this.accountMap.set(acc.name, acc)) : null;
        this.categories = JSON.parse(sessionStorage.getItem("categories"));
        this.categories != null ? this.categories.forEach(cat => this.categoryMap.set(cat.name, cat)) : null;
        this.transactions = JSON.parse(sessionStorage.getItem("transactions"));
        if (this.transactions != null) {
            this.resetAccumulation();
            this.calculate();
        }
    }

    resetAccumulation(): void {
        this.accounts.forEach(acc => acc.value = 0);
        this.categories.forEach(cat => cat.actual = 0);
    }

    calculate(): void {
        for (let i = 0; i < this.transactions.length; i++) {
            let acc: string = this.transactions[i].account;
            this.accountMap.get(acc).value += this.transactions[i].amount;
            let cat: string = this.transactions[i].category;
            if (cat != "Transfer") this.categoryMap.get(cat).actual += this.transactions[i].amount;
        }
        this.accounts = Array.from(this.accountMap.values());
        this.categories = Array.from(this.categoryMap.values());
        sessionStorage.setItem("accounts", JSON.stringify(this.accounts));
        sessionStorage.setItem("categories", JSON.stringify(this.categories));
    }
}
