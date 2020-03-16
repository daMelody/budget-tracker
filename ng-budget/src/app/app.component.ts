import { Component } from "@angular/core";
import { FileService } from '../services/file-service';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    constructor(private files: FileService) {}

    fileHandler(e): void {
        let file: File = e.target.files[0];
        this.files.open(file);
    }
}
