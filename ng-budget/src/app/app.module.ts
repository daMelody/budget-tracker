import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";

import { AppComponent } from "./app.component";
import { ConnectBarComponent } from "./connect-bar/connect-bar.component";
import { OverviewComponent } from "./overview/overview.component";
import { TransactionTableComponent } from "./transaction-table/transaction-table.component";
import { AccountManagerComponent } from './account-manager/account-manager.component';

@NgModule({
    declarations: [
        AppComponent,
        ConnectBarComponent,
        OverviewComponent,
        TransactionTableComponent,
        AccountManagerComponent
    ],
    imports: [BrowserModule, FormsModule, MatButtonModule, MatTableModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
