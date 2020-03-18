import { Injectable } from '@angular/core';
import { Account } from '../../type-classes/account/account';
import { Category } from '../../type-classes/category/category';
import { Transaction } from '../../type-classes/transaction/transaction';

@Injectable({
    providedIn: 'root',
})
export class Download {

    jsonParseAccounts(accounts: Array<Account>): void {
        let cls: string = ""
        for (let i: number = 0; i < accounts.length; i++) {
            let acc: Account = accounts[i];
            cls += acc.number + ",";
            cls += acc.name + ",";
            cls += acc.value + "\n";
        }
        this.makeFile(cls, "Account.cls");
    }

    jsonParseCategories(categories: Array<Category>): void {
        let cls: string = ""
        for (let i: number = 0; i < categories.length; i++) {
            let cat: Category = categories[i];
            cls += cat.code + ",";
            cls += cat.name + ",";
            cls += cat.expected + ",";
            cls += cat.actual + "\n";
        }
        this.makeFile(cls, "Category.cls");
    }

    jsonParseTransactions(transactions: Array<Transaction>): void {
        let cls: string = ""
        for (let i: number = 0; i < transactions.length; i++) {
            let trans: Transaction = transactions[i];
            cls += trans.date + ",";
            cls += trans.amount + ",";
            cls += trans.account + ",";
            cls += trans.category + ",";
            cls += trans.description + "\n";
        }
        this.makeFile(cls, "Transaction.cls");
    }

    makeFile(text: string, fileName: string): void {
        let blob: Blob = new Blob([text], { type: 'text/cls' });
        let url: string = window.URL.createObjectURL(blob);
        let link: HTMLAnchorElement = document.createElement("a");
        link.download = fileName;
        link.innerHTML = "Download " + fileName;
        if (window.webkitURL != null) {
            link.href = url;
        }
        link.click();
    }
}
