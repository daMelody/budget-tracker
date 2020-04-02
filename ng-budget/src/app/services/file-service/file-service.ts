import { Injectable } from '@angular/core';
import { Upload } from '../upload/upload';
import { Download } from '../download/download';

@Injectable({
    providedIn: 'root',
})
export class FileService {

    constructor(private upload: Upload, private download: Download) { }
    reader: FileReader = new FileReader();

    open(file: File, name: string) {
        let text: string | ArrayBuffer;
        this.reader.onload = (e) => {
            text = this.reader.result;
            this.upload.clsParse(text.toString(), name);
        }
        this.reader.readAsText(file);
    }

    write() {
        this.download.jsonParseAccounts(JSON.parse(sessionStorage.getItem("accounts")));
        this.download.jsonParseCategories(JSON.parse(sessionStorage.getItem("categories")));
        this.download.jsonParseTransactions(JSON.parse(sessionStorage.getItem("transactions")));
    }

    close(file: File) { }
}
