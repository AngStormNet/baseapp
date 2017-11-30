import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/index';


@Injectable()
export class UserService {

    // Supporting Variables
    currentUser: any;

    constructor(private http: Http) {
        this.refreshCurrentUser();
    }

    refreshCurrentUser() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    getAll() {
        // return a list of all users in the database
        return this.http.get(
            environment.API_ENDPOINT + 'users', this.jwt()
        ).map((response: Response) => response.json());
    }

    getCurrent() {
        // return current user data from local storage as object
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    getById(id: number) {
        // return a single user object based on the given id
        return this.http.get(
            environment.API_ENDPOINT + 'users/' + id, this.jwt()
        ).map((response: Response) => response.json());
    }

    clientArray(user) {
        // Creates array of clients from user JSON object.
        let clients = []
        if(user) {
            for(let client of user.profile.clients) {
                let clientName = JSON.stringify(
                    client.name
                ).replace('"','').replace('"','');
                if(client.indexOf(clientName) == -1) {
                    clients.push(clientName);
                }
            }
        }
        return clients;
    }

    groupArray(user) {
        // Creates array of groups from user JSON object.
        let groups = []
        if(user) {
            for(let group of user.groups) {
                let groupName = JSON.stringify(
                    group.name
                ).replace('"','').replace('"','');
                if(groups.indexOf(groupName) == -1) {
                    groups.push(groupName);
                }
            }
        }
        return groups;
    }

    logout() {
        // Remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        window.location.replace('/login');
    }

    updateUser(user_id: number, groups: any[]) {
        // Update the groups assigned to a single user by calling the update API
        let json_groups = {};
        json_groups["groups"] = groups;

        return this.http.put(
            environment.API_ENDPOINT + 'users/' + user_id,
            json_groups,
            this.jwt()
        ).map((response: Response) => response.json());
    }

    updateLocalClients(clients: any[]) {
        // Update the 'clients' in local storage for the current user.
        let currentUser: any = this.getCurrent();
        if(!currentUser.profile) {
            currentUser.profile = {};
        }
        currentUser.profile.clients = clients;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.refreshCurrentUser();
    }

    updateLocalGroups(groups: any[]) {
        // Update the 'groups' in local storage for the current user.
        let currentUser = this.getCurrent();
        currentUser.groups = groups;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    jwt() {
        // create authorization header with jwt token
        if (this.currentUser && this.currentUser.token) {
            return new RequestOptions({ headers: this.jwtHeaderOnly() });
        }
    }

    jwtHeaderOnly() {
        // create authorization header with jwt token
        if (this.currentUser && this.currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Token ' + this.currentUser.token });
            return headers;
        }
    }

    canAdd(model: string) {
        // can the user add a record in the model
        let app: string = this.getApp(model);
        return this.currentUser.permissions.indexOf(app + '.add_' + model.toLowerCase()) >-1;
    }

    canDelete(model: string) {
        // can the user delete a record from the model
        let app: string = this.getApp(model);
        return this.currentUser.permissions.indexOf(app + '.delete_' + model.toLowerCase()) >-1;
    }

    canView(data: string) {
        // can the user view a piece of information
        let app: string = 'cxe';
        return this.currentUser.permissions.indexOf(app + '.view_' + data.toLowerCase()) >-1;
    }

    canUpdate(model: string) {
        // can the user change a record in the model
        let app: string = this.getApp(model);
        return this.currentUser.permissions.indexOf(app + '.change_' + model.toLowerCase()) >-1;
    }

    getApp(model: string) {
        // take the model and return the appropriate app name
        model = model.toLowerCase();
        let app: string;

        switch (model) {
            case "user":
                app = 'auth';
                break;

            default:
                app = 'cxe';
        }

        return app;
    }

    filterByGroup(users: any[], groupName: string) {
        // Return an array of users with the given group name.
        var filteredUsers: User[] = [];
        for(let user of users) {
            for(let usergroup of user.groups) {
                if (usergroup.name == groupName) {
                    filteredUsers.push(user);
                }
            }
        }
        return(filteredUsers);
    }

    getGroups() {
        return this.http.get(environment.API_ENDPOINT + 'groups', this.jwt())
        .map((response: Response) => response.json()
        );
    }

    hasGroup(group: string) {
        // is the user a member of stated user group
        return this.currentUser.groups.indexOf(group) >-1;
    }

    groupCount() {
        return this.currentUser.groups.length;
    }

    _generateFakeUser() {
        // generate a fake currentUser so unit tests have data to work with
        let fakeUser = `{
            "last_name":"What",
            "permissions":["cxe.add_content","cxe.delete_content","cxe.change_content"],
            "token":"974b9008eb0004622c7280411a718358243011f4",
            "groups":["Administrator"],
            "email":"",
            "id":1,
            "first_name":"Test"
        }`;
        // removing carriage return and newlines to prevent errors
        fakeUser = fakeUser.replace(/(\r\n|\n|\r)/gm,"");
        this.currentUser = JSON.parse(fakeUser);

        return this.currentUser;
    }

    _generateTestUser(group_name) {
        // generate a fake currentUser with the given group,
        // so unit tests have data to work with
        this.currentUser  = {
            'first_name': 'Test',
            'last_name': group_name,
            'groups':[group_name],
            'permissions': '',
            'email': 'test.user@ray.com',
            'id': 1,
        }
        return this.currentUser;
    }
}
