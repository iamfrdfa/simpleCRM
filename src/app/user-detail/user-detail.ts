import {Component, OnInit, inject} from '@angular/core';
import {UI_IMPORTS} from '../shared/ui.imports';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-user-detail',
    imports: [
        UI_IMPORTS
    ],
    templateUrl: './user-detail.html',
    styleUrl: './user-detail.scss'
})
export class UserDetail {
    userId: string | null =  '';

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() : void {
        this.route.paramMap.subscribe(params => {
            this.userId = params.get('id');
            console.log("Got ID:", this.userId);
        });
    }
}
