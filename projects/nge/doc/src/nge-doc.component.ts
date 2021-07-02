import { Component, OnInit } from '@angular/core';
import { NgeDocService } from './nge-doc.service';

@Component({
    selector: 'nge-doc',
    templateUrl: './nge-doc.component.html',
    providers: [NgeDocService],
    styleUrls: ['nge-doc.component.scss']
})
export class NgeDocComponent implements OnInit {
    constructor(
        private readonly navigation: NgeDocService,
    ) {}

    async ngOnInit() {
        await this.navigation.setup();
    }
}
