import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { ConnectBarComponent } from './connect-bar/connect-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewComponent } from './overview/overview.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';

@NgModule({
    declarations: [
        AppComponent,
        ConnectBarComponent,
        OverviewComponent,
        TransactionTableComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MatButtonModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
