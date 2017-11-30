import { Http } from '@angular/http';

import { 
    AlertService, 
    UserService, 
    ValuelistService } from 'app/_services/index';


describe('Value List Service: ', () => {    
    // Test Value List Service methods/functions
    let http: Http;
    let alertService: AlertService;
    let userService: UserService;

    let service = new ValuelistService(
        http,
        alertService,
        userService,
    );
    // create value list to set and get
    let testlist = [
        {'id': 1, 'name': 'ArcSight', 'subset': 'Active Channel Rules'},
        {'id': 2, 'name': 'Bluecoat', 'subset': 'Security Analytics'},
        {'id': 3, 'name': 'CatScratch', 'subset': 'Enterprise Security Kittens'},
    ]

    it('#store and get valuelist"', () => {
        // First store the value list
        service.store('test_list',testlist);
        // now get the value list
        var retrieved_list = service.get('test_list');
        // make sure they're the list retrieved is the same as the original
        expect(JSON.stringify(retrieved_list)).toEqual(JSON.stringify(testlist));
    });
});