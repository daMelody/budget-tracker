import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-transaction-table",
    templateUrl: "./transaction-table.component.html",
    styleUrls: ["./transaction-table.component.css"]
})
export class TransactionTableComponent implements OnInit {
    displayedColumns: String[] = [
        "date",
        "amount",
        "account",
        "type",
        "description"
    ];
    transactions: any[];

    constructor() {}

    ngOnInit() {}
}
