import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSortModule } from "@angular/material/sort";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';

import { AppComponent } from "./app.component";
import { ConnectBarComponent } from "./connect-bar/connect-bar.component";
import { OverviewComponent } from "./overview/overview.component";
import { TransactionTableComponent } from "./transaction-table/transaction-table.component";
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { CategoryManagerComponent } from './category-manager/category-manager.component';

const routes: Routes = [
    { path: 'accounts', component: AccountManagerComponent },
    { path: 'categories', component: CategoryManagerComponent },
    { path: 'transactions', component: TransactionTableComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        ConnectBarComponent,
        OverviewComponent,
        TransactionTableComponent,
        AccountManagerComponent,
        CategoryManagerComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatCheckboxModule,
        MatInputModule,
        MatSortModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
