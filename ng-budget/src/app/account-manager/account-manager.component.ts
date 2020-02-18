import { Component, OnInit } from "@angular/core";
import { Account } from "../type-classes/account/account";

@Component({
    selector: "app-account-manager",
    templateUrl: "./account-manager.component.html",
    styleUrls: ["./account-manager.component.css"]
})
export class AccountManagerComponent implements OnInit {
    constructor() {}
    ngOnInit() {}

    displayedColumns: String[] = ["select", "number", "name", "value"];
    accounts: Array<Account>;

    newNumber: Number = this.accounts.length;
    newName: String;
    newValue: Number;

    addAccount(): void {
        let newAccount: Account = new Account();
        newAccount.number = this.newNumber;
        newAccount.name = this.newName;
        newAccount.value = this.newValue;
        this.accounts.push(newAccount);
    }
}
