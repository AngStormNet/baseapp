import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-usermenu',
    templateUrl: './usermenu.component.html',
})

export class UsermenuComponent implements OnInit {
    copy = require("../../../package.json")
    version = this.copy.version;
    appname = this.copy.appName;
    user: any;

    constructor(private userService: UserService) {
        this.user = this.userService.getCurrent();
    }

    ngOnInit() {
        let body = document.getElementsByTagName('body')[0];
        body.style.background = '';
    }

    onUserGuide() {
        // Open the user guide in a new browser window.
        window.open("/assets/documents/userguide.pdf", "_blank");
    }
}