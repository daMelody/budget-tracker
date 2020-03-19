import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/type-classes/category/category';

@Component({
    selector: 'app-new-category-dialog',
    templateUrl: './new-category-dialog.component.html',
    styleUrls: ['./new-category-dialog.component.css']
})
export class NewCategoryDialogComponent implements OnInit {
    ngOnInit(): void { }

    constructor(
        public dialogRef: MatDialogRef<NewCategoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public category: Category
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
