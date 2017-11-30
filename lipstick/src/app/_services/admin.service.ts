import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SimpleListInterface } from '../_interfaces/simplelist.interface';
import { UserService } from './user.service';


@Injectable()
export class AdminService {
    constructor(
        private http: Http,
        private userService: UserService,
        ) { }

    getAPI(apiFragment: string) {
        // get specified value list from database
        return this.http.get(
            environment.API_ENDPOINT + apiFragment, this.userService.jwt()
        ).map((response: Response) => response.json());
    }

    putData(apiFragment: string, data: SimpleListInterface) {
        // Put Data to the API endpoint
        return this.http.put(
            environment.API_ENDPOINT + apiFragment + '/' + (data.id || data.name),
            data,
            this.userService.jwt()
        )  .map(res => res.json());
    }

    postData(apiFragment: string, data: SimpleListInterface) {
        // Post Data to the API endpoint
        return this.http.post(
            environment.API_ENDPOINT + apiFragment,
            data,
            this.userService.jwt()
        )  .map(res => res.json());
    }
}
