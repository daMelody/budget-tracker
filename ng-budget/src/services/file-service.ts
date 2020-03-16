import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FileService {

    reader: FileReader = new FileReader();

    open(file: File) {
        let text;
        this.reader.onload = (e) => {
            text = this.reader.result;
            // could assign sessionStorage here
            console.log(text);
        }
        this.reader.readAsText(file);
    }

    write(file: File) {

    }

    close(file: File) {

    }


}
