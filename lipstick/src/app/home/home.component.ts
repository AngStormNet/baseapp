import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router, NavigationStart } from '@angular/router';

import { User } from '../_models/index';
import {
    AlertService,
    UserService,
    ValuelistService,
} from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    copy = require("../../../package.json");
    currentUser: User;
    vl_seconds: number = 0;
    timer_status: number = 0;
    users: User[] = [];

    constructor (
        private alertService: AlertService,
        private router: Router,
        private userService: UserService,
        private valuelistService: ValuelistService,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        // Set the localstorage.version on load (will log user out if version changes)
        this.setVersion();
        // If the route changes, lets check the version and log out if needed.
        this.router.events.subscribe((event) => {
            // There is NavigationStart, NavigationEnd we use the start to check
            if(event instanceof NavigationStart){
                this.setVersion();
            }
        });

        if(environment.VALUELIST_REFRESH > 0) {
            let vl_timer = Observable.timer(2000,1000);
            vl_timer.subscribe(t => this.vl_check(t));
        }

    }

    private vl_check(second){
        /* populate value lists into local storage every
            environment.VALUELIST_REFRESH value i.e. 300 seconds
        */
        // modulo to trigger vl refresh
        if(environment.VALUELIST_REFRESH > 0) {
            let trigger: number = this.vl_seconds % environment.VALUELIST_REFRESH;
            if((trigger == 0 && this.vl_seconds != 0) || this.timer_status == 0) {
                // turn status to on
                this.timer_status = 1;
                this.valuelistService.populate();
            }
            this.vl_seconds = second;
        }
    }

    private setVersion() {
        // Set the version for tracking purposes locally, logout if old version is detected.
        let version = this.copy.version;
        let localVersion = localStorage.getItem("version");
        if (localVersion != version) {
            // Clear localstorage, and logout.
            this.userService.logout();
            localStorage.clear();
        }
        localStorage.setItem("version", version);
    }
}
