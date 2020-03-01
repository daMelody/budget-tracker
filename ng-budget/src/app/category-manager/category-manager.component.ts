import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Category } from '../type-classes/category/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {
    displayedColumns: string[] = ["select", "code", "name", "expected", "actual"];
    categories: Array<Category>;
    selection: SelectionModel<Category> = new SelectionModel<Category>(true, []);
    @ViewChild(MatTable,{static: true}) table: MatTable<Category>;

    newCode: string;
    newName: string;
    newExpected: number;

    constructor(private router: Router) { }
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

    addCategory(): void {
        let answer: boolean = true;
        if (this.newCode == null || this.newName == null) {
            answer = confirm("Are you sure you want to add this Category?");
        }
        if (answer) {
            let newCategory: Category = new Category();
            newCategory.code = this.newCode
            newCategory.name = this.newName;
            newCategory.expected = this.newExpected == null ? 0 : this.newExpected;
            newCategory.actual = 0;
            this.categories.push(newCategory);
            this.newName = null;
            this.newCode = null;
            this.newExpected = null
            this.table.renderRows();
        }
    }

    deleteCategory(): void {
        if (confirm("Are you sure you want to delete this Category?")) {
            this.categories = this.categories.filter(elt => !this.selection.selected.includes(elt));
            this.selection.clear();
            this.table.renderRows();
        }
    }

    saveCategories(): void {
        sessionStorage.setItem("categories", JSON.stringify(this.categories));
        this.router.navigate([""]);
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
