import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
    AlertService,
    ArrayService,
    MessageService,
    UserService,
} from '../_services/index';
import { DragulaModule, DragulaService } from 'ng2-dragula';

@Component({
    selector: 'account-edit',
    templateUrl: './account-edit.component.html',
})
export class AccountEdit {
    id: number;
    user: any;

    public GroupsAvailable = [];
    public GroupsAssigned = [];

    public constructor(
        private arrayService: ArrayService,
        private dragulaService: DragulaService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService,
    ) {
        // Clean up any leftover "bags" then setup a new one.
        const bag: any = this.dragulaService.find('groups');
        if (bag !== undefined ) this.dragulaService.destroy('groups');

        this.dragulaService.setOptions(
            'groups', {
                removeOnSpill: false,
            }
        );

        this.getID();
    }

    private getID():void {
        // Get UserID and object
        this.route.params.subscribe(
            params => {
                this.id = + params['id'];
                this.userService.getById(this.id).subscribe(
                    response => {
                        this.parseData(response);
                    },
                    error => {
                        this.alertService.error(error);
                    }
                );
            }
        );
    }

    private saveGroups() {
        // Call the user update API to save the groups
        var server_response;
        this.userService.updateUser(this.id, this.GroupsAssigned).subscribe(
            response => {
                // Successful API call
                server_response = response;
                this.saveLocalGroups();
                this.updateGroups();
                this.closeModal();

            },
            error => {
                this.alertService.error(error);
            }
        );       
    }

    sendMessage(subject: string, model: string) {
        // send message to subscribers via observable subject
        this.messageService.sendMessage(subject, model);
    }

    private updateGroups(): void {
        // change the users groups list in the account list 
        let user = '{"id": ' + this.id + ', "groups": ' + JSON.stringify(this.GroupsAssigned) + ' }';
        this.sendMessage('user', user);
    }

    private closeModal() {
        // closes the visible modal dialog box 
        this.router.navigate(["/administration"]).then(() =>
            this.router.navigate([".", { outlets: { modaloutlet: null } }]));
    }

    private saveLocalGroups(): void {
        // If the user being updated is also the current user,
        // update the 'groups' in local storage for the current user.
        var currentUser = this.userService.getCurrent();
        if (currentUser.id == this.id) {
            this.userService.updateLocalGroups(this.GroupsAssigned);
        }
    }

    private parseData(user) {
        // Runs within the getById subscription, and we freshen data each time
        this.user = user;
        this.GroupsAvailable = [];
        this.GroupsAssigned = [];

        this.GroupsAssigned = this.userService.groupArray(user);
        this.GroupsAvailable = this.getAvailbleGroups();
        return;
    }

    private getAvailbleGroups() {
        // Gets all avaiable groups from the /groups/ API server
        // Then removes groups already assigned to the user.
        var Groups = [];
        this.userService.getGroups().subscribe(
            response => {
                Array.prototype.push.apply(
                    Groups,
                    this.arrayService.removeSecondaryFromPrimary(
                        this.GroupsAssigned,
                        response
                    )
                );
            },
            error => {
                this.alertService.error(error);
            }
        );
        return(Groups);
    }

}
