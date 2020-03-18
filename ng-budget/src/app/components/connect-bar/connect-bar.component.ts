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

    constructor(private router: Router) { }
    ngOnInit(): void { }

    openAccounts(): void {
        this.router.navigateByUrl("accounts");
    }

    openCategories(): void {
        this.router.navigateByUrl("categories");
    }

    openOverview(): void {
        this.router.navigateByUrl("overview");
    }

    openTransactions(): void {
        this.router.navigateByUrl("transactions");
    }

    openLoadingDock(): void {
        this.router.navigateByUrl("");
    }
}
