import { Injectable } from '@angular/core';
import { Account } from '../type-classes/account/account';
import { Category } from '../type-classes/category/category';
import { Transaction } from '../type-classes/transaction/transaction';

@Injectable({
    providedIn: 'root',
})
export class Download {

    jsonParseAccounts(accounts: Array<Account>): void {
        console.log(accounts);
        let cls: string = ""
        for (let i: number = 0; i < accounts.length; i++) {
            let acc: Account = accounts[i];
            cls += acc.number + ",";
            cls += acc.name + ",";
            cls += acc.value + "\n";
        }
        console.log(cls);
        this.makeFile(cls, "Account.cls");
    }

    jsonParseCategories(categories: Array<Category>): void {

    }

    jsonParseTransactions(transactions: Array<Transaction>): void {

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
