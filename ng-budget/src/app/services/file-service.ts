import { Injectable } from '@angular/core';
import { Account } from '../type-classes/account/account';
import { Category } from '../type-classes/category/category';
import { Transaction } from '../type-classes/transaction/transaction';
import { Upload } from './upload';
import { Download } from './download';

@Injectable({
    providedIn: 'root',
})
export class FileService {

    constructor(private upload: Upload, private download: Download) { }
    reader: FileReader = new FileReader();

    open(file: File) {
        let text: string | ArrayBuffer;
        this.reader.onload = (e) => {
            text = this.reader.result;
            let title: string = file.name;
            this.upload.clsParse(text.toString(), title);
            //sessionStorage.setItem(title, JSON.stringify(title));
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
