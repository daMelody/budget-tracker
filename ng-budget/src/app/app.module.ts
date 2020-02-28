import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSortModule } from "@angular/material/sort";
import { MatDatepickerModule } from "@angular/material/datepicker";

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
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatCheckboxModule,
        MatInputModule,
        MatSortModule,
        MatDatepickerModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
