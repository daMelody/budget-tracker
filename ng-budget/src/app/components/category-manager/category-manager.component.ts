import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Category } from 'src/app/type-classes/category/category';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryDialogComponent } from 'src/app/modals/new-category-dialog/new-category-dialog.component';

@Component({
    selector: 'app-category-manager',
    templateUrl: './category-manager.component.html',
    styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {
    displayedColumns: string[] = ["select", "code", "name", "expected", "actual"];
    categories: Array<Category>;
    selection: SelectionModel<Category> = new SelectionModel<Category>(true, []);
    @ViewChild(MatTable, { static: true }) table: MatTable<Category>;

    newCode: string;
    newName: string;
    newExpected: number;

    constructor(public dialog: MatDialog) { }
    ngOnInit(): void {
        let cat = JSON.parse(sessionStorage.getItem("categories"))
        this.categories = cat != null ? cat : new Array<Category>();
    }

    /* for SELECTION */

    isAllSelected(): Boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.categories.length;
        return numSelected === numRows;
    }

    masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.categories.forEach(row => this.selection.select(row));
    }

    newCategory(): void {
        const dialogRef = this.dialog.open(NewCategoryDialogComponent, {
            width: '40%',
            data: { name: '', code: '', expected: 0, }
        });
        dialogRef.afterClosed().subscribe(newCategory => {
            if (newCategory != null) {
                this.addCategory(newCategory)
            }
        });
    }

    addCategory(newCategory: Category): void {
        let answer: boolean = true;
        if (newCategory.name == null ||
            newCategory.code == null ||
            newCategory.expected == null
        ) {
            answer = confirm("Are you sure you want to add this Category?");
        }
        if (answer) {
            newCategory.actual = 0;
            this.categories.push(newCategory);
            this.table.renderRows();
            sessionStorage.setItem("categories", JSON.stringify(this.categories));
        }
    }

    updateCategories(): void {
        sessionStorage.setItem("categories", JSON.stringify(this.categories));
    }

    deleteCategory(): void {
        if (confirm("Are you sure you want to delete this Category?")) {
            this.categories = this.categories.filter(elt => !this.selection.selected.includes(elt));
            this.selection.clear();
            this.table.renderRows();
            sessionStorage.setItem("categories", JSON.stringify(this.categories));
        }
    }

    sortCategory(event): void {
        switch (event.active) {
            case "code": this.categories = this.categories.sort(this.codeSort);
                break;
            case "name": this.categories = this.categories.sort(this.nameSort);
                break;
            case "expected": this.categories = this.categories.sort(this.expectedSort);
                break;
            case "actual": this.categories = this.categories.sort(this.actualSort);
            default: console.log("Invalid sort parameter");
        }
        if (event.direction == "asc") {
            this.categories = this.categories.reverse();
        }
        this.table.renderRows();
    }

    /* SORTING methods for each sortable Category field */

    codeSort(a: Category, b: Category): number {
        if (a.code < b.code) {
            return -1;
        } else if (a.code > b.code) {
            return 1;
        } else {
            return 0;
        }
    }

    nameSort(a: Category, b: Category): number {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    }

    expectedSort(a: Category, b: Category): number {
        return a.expected - b.expected;
    }

    actualSort(a: Category, b: Category): number {
        return a.actual - b.actual;
    }
}
