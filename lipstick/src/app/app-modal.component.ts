import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'

@Component({
    selector: 'app-modal',
    templateUrl: './app-modal.component.html',
    styleUrls: ['./app-modal.component.css']
})
export class ModalComponent {
    @Output() modalClose : EventEmitter<any> = new EventEmitter<any>();

    constructor( private router : Router ) {}

    closeModal() {
        this.router.navigate(["/administration"]).then(() =>
            this.router.navigate([".", { outlets: { modaloutlet: null } }]));
    }
}
