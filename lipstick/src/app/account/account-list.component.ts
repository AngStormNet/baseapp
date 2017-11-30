import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { AlertService, MessageService, UserService } from '../_services/index';

@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
})
export class AccountList implements OnDestroy, OnInit {
    // Generates the list of user accounts for administration view
    data: Array<Object>;
    message: any;
    subscription: Subscription;
    title: string;

    constructor(
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private UserService: UserService,
        private alertService: AlertService) { 
            this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
            this.title = 'Accounts';
        }

    ngDoCheck() {
        if(this.message) {
            // Check if there's a new message
            let model = JSON.parse(this.message.model);
            // If the message is about the user the parse and use data
            if(this.message.subject === 'user') {
                // set the groups cell of the list equal to the groups list in the model
                document.getElementById(model.id + 'groups').innerHTML = model.groups.join(', ');
            }
        }
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
    
    ngOnInit() {
        this.UserService.getAll().subscribe(
            data => this.data = data,
            error => {
                this.alertService.error(error);
            }
        );
     
        document.getElementById('link' + this.title).className += ' cx-link-active';
        document.getElementById('admin-title').innerHTML = this.title;
    }
}
