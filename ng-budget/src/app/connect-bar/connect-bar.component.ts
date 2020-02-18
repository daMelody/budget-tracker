import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'app-connect-bar',
    templateUrl: './connect-bar.component.html',
    styleUrls: ['./connect-bar.component.css']
})
export class ConnectBarComponent implements OnInit {

    @Input() urlConnection: String;

    constructor() { }
    ngOnInit(): void { }

    submitUrl() {
        console.log(this.urlConnection);
    }

}
