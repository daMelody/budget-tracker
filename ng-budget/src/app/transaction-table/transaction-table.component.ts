import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-transaction-table",
    templateUrl: "./transaction-table.component.html",
    styleUrls: ["./transaction-table.component.css"]
})
export class TransactionTableComponent implements OnInit {
    constructor() {}
    ngOnInit() {}

    displayedColumns: String[] = [
        "date",
        "amount",
        "account",
        "type",
        "description"
    ];
    transactions: any[];

    /*initialSelection = [];
    allowMultiSelect = true;
    selection = new SelectionModel<>(this.allowMultiSelect,this.initialSelection);

    isAllSelected(): Boolean {
        const numSelected: Number = this.selection.selected.length;
        const numRows: Number = this.transactions.data.length;
        return numSelected == numRows;
    }

    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.transactions.data.forEach(row => this.selection.select(row));
    }*/
}
