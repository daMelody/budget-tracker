import { Injectable } from '@angular/core';
import { Account } from '../../type-classes/account/account';
import { Category } from '../../type-classes/category/category';
import { Transaction } from '../../type-classes/transaction/transaction';

@Injectable({
    providedIn: 'root',
})
export class Upload {

    clsParse(stuff: string, type: string): void {
        let objects: Array<any>;
        let token: string;
        switch (type) {
            case "Account.cls":
                objects = this.parseCLStoAccount(stuff);
                token = "accounts";
                break;
            case "Category.cls":
                objects = this.parseCLStoCategory(stuff);
                token = "categories";
                break;
            case "Transaction.cls":
                objects = this.parseCLStoTransaction(stuff);
                token = "transactions";
                break;
            default: console.log("incorrect file naming");
        }
        sessionStorage.setItem(token, JSON.stringify(objects));
    }

    parseCLStoAccount(stuff: string): Array<Account> {
        let accounts: Array<Account> = new Array<Account>();
        let account: Account = new Account();
        let index: number = 0;
        let cell: string = "";
        for (const ch of stuff) {
            if (ch === '\n') {
                account.value = Number.parseFloat(cell);
                accounts.push(account);
                account = new Account();
                index = 0;
                cell = "";
            } else if (ch === ',') {
                if (index == 0) {
                    account.name = cell;
                } else {
                    console.log("bad index");
                }
                cell = "";
                index++;
            } else if (ch === ' ') {
                continue;
            } else {
                cell += ch;
            }
        }
        return accounts;
    }

    parseCLStoCategory(stuff: string): Array<Category> {
        let categories: Array<Category> = new Array<Category>();
        let category: Category = new Category();
        let index: number = 0;
        let cell: string = "";
        for (const ch of stuff) {
            if (ch === '\n') {
                category.actual = Number.parseFloat(cell);
                categories.push(category);
                category = new Category();
                index = 0;
                cell = "";
            } else if (ch === ',') {
                switch (index) {
                    case 0: category.name = cell;
                        break;
                    case 1: category.expected = Number.parseFloat(cell);
                        break;
                    default: console.log("bad index");
                }
                cell = "";
                index++;
            } else if (ch === ' ') {
                continue;
            } else {
                cell += ch;
            }
        }
        return categories;
    }

    parseCLStoTransaction(stuff: string): Array<Transaction> {
        let transactions: Array<Transaction> = new Array<Transaction>();
        let transaction: Transaction = new Transaction();
        let index: number = 0;
        let cell: string = "";
        for (const ch of stuff) {
            if (ch === '\n') {
                transaction.description = cell;
                transactions.push(transaction);
                transaction = new Transaction();
                index = 0;
                cell = "";
            } else if (ch === ',') {
                switch (index) {
                    case 0: transaction.date = new Date(cell);
                        break;
                    case 1: transaction.amount = Number.parseFloat(cell);
                        break;
                    case 2: transaction.account = cell;
                        break;
                    case 3: transaction.category = cell;
                        break;
                    default: console.log("bad index");
                }
                cell = "";
                index++;
            } else if (ch === ' ' && index <= 3) {
                continue;
            } else {
                cell += ch;
            }
        }
        return transactions;
    }
}
