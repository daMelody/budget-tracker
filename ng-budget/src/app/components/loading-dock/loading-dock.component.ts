import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file-service';

@Component({
  selector: 'app-loading-dock',
  templateUrl: './loading-dock.component.html',
  styleUrls: ['./loading-dock.component.css']
})
export class LoadingDockComponent implements OnInit {

    constructor(private files: FileService) {}
    ngOnInit(): void {}

    fileHandler(e): void {
        let file: File = e.target.files[0];
        this.files.open(file);
    }

}
