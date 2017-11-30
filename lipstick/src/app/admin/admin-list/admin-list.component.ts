import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../_services/admin.service';
import { Observable } from 'rxjs';
import { SimpleListInterface } from '../../_interfaces/index';

@Component({
    selector: 'cnx-admin-list',
    templateUrl: './admin-list.component.html',
    styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
    addObjects: boolean = true; // Show the + button for adding objects
    apiString: string;
    data: Observable<SimpleListInterface>;
    objectAdd: boolean = false; // Are you adding a new object?
    page: string;
    pageArray = [
        'attack_phases',
        'custom_inputs',
        'logs',
        'packets',
        'platforms',
        'protocols',
        'threat_actors',
        'threat_categories',
        'settings'
    ]

    constructor(
        private adminService: AdminService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getPage();
    }

    private getPage():void {
        // Get the page parameter from the url /platforms etc
        this.route.params.subscribe(
            params => {
                this.populatePage(params);
            }
        );
    }

    private populatePage(params: any) {
        // Replace underscores with space for page title, and replace underscores
        // with nothing for API call.
        this.objectAdd = false;
        const page = params['id'];
        // Check to ensure the page we are trying to access is in the array
        if (this.pageArray.indexOf(page) < 0) {
            this.router.navigate(['administration']);
        }
        this.addObjects = page === 'settings' ? false : true;
        this.apiString = page.replace(/_/g,'');
        this.page = page.replace(/_/g,' ');
        this.page = this.page.charAt(0).toUpperCase() + this.page.slice(1)

        document.getElementById('admin-title').innerHTML = this.page;
        // get the required data from the API
        this.data = this.adminService.getAPI(this.apiString)
    }

    toggleAdd() {
        // Scroll to top and set object add true.
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.objectAdd = true;
    }
}
