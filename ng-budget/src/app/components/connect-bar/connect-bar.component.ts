import { Component, OnInit, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file-service';

@Component({
    selector: "app-connect-bar",
    templateUrl: "./connect-bar.component.html",
    styleUrls: ["./connect-bar.component.css"]
})
export class ConnectBarComponent implements OnInit {

    constructor(private router: Router, private fileService: FileService) { }
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

    saveFiles(): void {
        this.fileService.write();
    }
}
