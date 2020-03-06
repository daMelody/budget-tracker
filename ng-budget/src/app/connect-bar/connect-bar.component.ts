import { Component, OnInit, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { Router } from '@angular/router';
@Component({
    selector: "app-connect-bar",
    templateUrl: "./connect-bar.component.html",
    styleUrls: ["./connect-bar.component.css"]
})
export class ConnectBarComponent implements OnInit {
    @Input() urlConnection: String;

    constructor(private router: Router) {}
    ngOnInit(): void {}

    submitUrl() {
        console.log(this.urlConnection);
    }

    openAccounts() {
        this.router.navigateByUrl("accounts");
    }

    openCategories() {
        this.router.navigateByUrl("categories");
    }
    openTransactions() {
        this.router.navigateByUrl("transactions");
    }
}
