import { Injectable } from '@angular/core';
import { Account } from '../type-classes/account/account';
import { Category } from '../type-classes/category/category';
import { Transaction } from '../type-classes/transaction/transaction';

@Injectable({
    providedIn: 'root',
})
export class FileService {

    reader: FileReader = new FileReader();

    open(file: File) {
        let text: string | ArrayBuffer;
        this.reader.onload = (e) => {
            text = this.reader.result;
            let title: string = file.name;
            this.clsParse(text.toString(),title);
        }
        this.reader.readAsText(file);
    }

    write(file: File) {

    }

    close(file: File) {

    }

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
                switch (index) {
                    case 0: account.number = Number.parseInt(cell);
                    break;
                    case 1: account.name = cell;
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
                    case 0: category.code = cell;
                    break;
                    case 1: category.name = cell;
                    break;
                    case 2: category.expected = Number.parseFloat(cell);
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
        return transactions;
    }
}
