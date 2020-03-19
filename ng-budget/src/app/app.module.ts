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
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from "./app.component";
import { ConnectBarComponent } from "./components/connect-bar/connect-bar.component";
import { OverviewComponent } from "./components/overview/overview.component";
import { TransactionTableComponent } from "./components/transaction-table/transaction-table.component";
import { AccountManagerComponent } from './components/account-manager/account-manager.component';
import { CategoryManagerComponent } from './components/category-manager/category-manager.component';
import { LoadingDockComponent } from './components/loading-dock/loading-dock.component';
import { NewAccountDialogComponent } from './modals/new-account-dialog/new-account-dialog.component';
import { NewCategoryDialogComponent } from './modals/new-category-dialog/new-category-dialog.component';
import { NewTransactionDialogComponent } from './modals/new-transaction-dialog/new-transaction-dialog.component';
import { NewTransferDialogComponent } from './modals/new-transfer-dialog/new-transfer-dialog.component';

const routes: Routes = [
    { path: 'accounts', component: AccountManagerComponent },
    { path: 'categories', component: CategoryManagerComponent },
    { path: 'transactions', component: TransactionTableComponent },
    { path: 'overview', component: OverviewComponent },
    { path: '', component: LoadingDockComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        ConnectBarComponent,
        OverviewComponent,
        TransactionTableComponent,
        AccountManagerComponent,
        CategoryManagerComponent,
        LoadingDockComponent,
        NewAccountDialogComponent,
        NewCategoryDialogComponent,
        NewTransactionDialogComponent,
        NewTransferDialogComponent
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
        MatMenuModule,
        MatSelectModule,
        MatDialogModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
