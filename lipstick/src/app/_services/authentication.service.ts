import { Location, LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { LoginInterface } from '../_interfaces/login.interface';


@Injectable()
export class AuthenticationService {
    constructor (
        private http: Http, 
        private location:Location, 
        private locationStrategy:LocationStrategy
    ) { }

    login(formData: LoginInterface) {
        var headers = new Headers();
        let copy = require("../../../package.json");

        headers.append('Content-Type', 'application/json');
        return this.http.post(environment.API_ENDPOINT + 'user/authenticate/', formData, { headers: headers } )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // Clear localstorage
                    localStorage.clear();
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    // Set the version on login.
                    localStorage.setItem("version", copy.version);
                }
            });
    }
}
