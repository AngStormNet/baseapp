import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AlertService, UserService } from '../_services/index';


@Injectable()
export class ValuelistService {
    // Get the mostly static data from the DB and store in localStorage.
    // The data are used in UI field values and lists.
    VALUE_LISTS: any;

    constructor(
        private http: Http,
        private alertService: AlertService,
        private userService: UserService,
        ) {
        this.VALUE_LISTS = [
            'settings'
        ];
    }

    private getRemote(list: string) {
        // get specified value list from database
        return this.http.get(
            environment.API_ENDPOINT + list, this.userService.jwt()
        ).map((response: Response) => response.json());
    }

    private _structure(data) {
        for(let object of data) {
            let objectName = object.name;
            object.id = !object.id ? object.name : object.id;
            object.name = object.subset ? object.name + ' ( ' + object.subset + ' )' : object.name;
        }
        return data
    }

    get(list: string) {
        // return specified value list from local storage
        return JSON.parse(localStorage.getItem(list));
    }

    populate() {
        // retrieve all value lists then place in storage
        for (let list of this.VALUE_LISTS) {
            this.populateSingle(list);
        }
    }

    populateSingle(list: string) {
        // retrieve value list from list parameter then place in storage
        this.getRemote(list).subscribe(
            response => {
                this.store(list, response);
            },
            error => {
                console.log(error);
            }
        );
    }

    store(list: string, data: Array<Object>): void {
        // remove then store list into local storage
        let newData = this._structure(data);
        localStorage.removeItem(list);
        localStorage.setItem(list, JSON.stringify(newData));
    }
}
