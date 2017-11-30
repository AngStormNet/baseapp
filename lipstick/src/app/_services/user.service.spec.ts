import { Http } from '@angular/http';

import { UserService } from './user.service';


describe('User Service: ', () => {    
    //Test User Service methods/functions
    let http: Http;
    let service = new UserService(http);
    // create fake user on userservice instance to be able to test
    service._generateFakeUser();

    it('#canAdd returns true', () => {
        /* Checks that a user of any group has permission to add a record to a  
        given model as defined in the currentUser permissions property */
        expect(service.canAdd('content')).toEqual(true);
    });
    
    it('#canAdd returns false', () => {
        /* Checks that a user of any group does not have permission to add a record to a  
        given model as defined in the currentUser permissions property */
        expect(service.canAdd('user')).toEqual(false);
    });
    
    it('#canDelete return true', () => {
        /* Checks that a user of any group has permission to delete a record to a  
        given model as defined in the currentUser permissions property */
        expect(service.canDelete('content')).toEqual(true);
    });
    
    it('#canDelete return false', () => {
        /* Checks that a user of any group does not have permission to delete a record 
        in a given model as defined in the currentUser permissions property */
        expect(service.canDelete('user')).toEqual(false);
    });
    
    it('#canUpdate return true', () => {
        /* Checks that a user of any group has permission to update/change a 
        record to a given model as defined in the currentUser permissions property */
        expect(service.canUpdate('content')).toEqual(true);
    });
    
    it('#canUpdate return false', () => {
        /* Checks that a user of any group does not have permission to update a record in a  
        given model as defined in the currentUser permissions property */
        expect(service.canUpdate('user')).toEqual(false);
    });
    
    it('#getApp return "auth"', () => {
        /* a helper function to provide the django app name specific to a given model
        i.e "auth"" for users/groups and all others "cxe" */
        expect(service.getApp('user')).toEqual('auth');
    });
    
    it('#getApp return "cxe"', () => {
        /* makes sure the helper function returns "cxe" as a default app 
        when the supplied model is not "user" */
        expect(service.getApp('content')).toEqual('cxe');
    });
    
    it('#hasGroup"', () => {
        /* this checks currentUser locally stored data for the supplied 
        django user group.  the result should true here  */
        expect(service.hasGroup('Administrator')).toEqual(true);
    });

    it('#hasGroup"', () => {
        /* This makes sure the hasGroup function returns a negative when
        the supplied group name is not present in the currentUser JSON data  */
        expect(service.hasGroup('SuperUser')).toEqual(false);
    });

    it('#_generateTestUser', () => {
        /* this tests that the user service is generating 
        fake user data for testing purposes.  this bypasses
        the reliance on testing localstorage  */
        expect(service._generateTestUser('Author').last_name).toEqual('Author');
    });

    it('#_generateFakeUser', () => {
        /* this tests that the user service is generating 
        fake user data for testing purposes.  this bypasses
        the reliance on testing localstorage  */
        expect(service._generateFakeUser().first_name).toEqual('Test');
    });

    it('#groupArray', () => {
        /* Verify the user groups are represented as an array. */
        let testGroups = ["Administrator", "SME", "Engineer"];
        let user: any = JSON.parse('{"id": 23, "groups": [{ "name":"Administrator"}, { "name": "SME" }, {"name": "Engineer"}] }');
        expect(service.groupArray(user)).toEqual(testGroups);
    });
    
    it('#updateLocalGroups', () => {
        /* Verify the user groups are updated in localStorage
        for the current user.  */
        let testGroups = ["SME", "QA"];
        let fakeUser = service._generateFakeUser();
        localStorage.setItem('currentUser', JSON.stringify(fakeUser));
        service.updateLocalGroups(testGroups);
        fakeUser = service.getCurrent();
        expect(fakeUser.groups).toEqual(testGroups);
    });

    it('#filterByGroup tests' , () => {
        /* Verify the filterByGroup returns correct array of users. */
        let users = [
            {
                id: 1,
                groups: [{name: 'Author'}]
            },
            {
                id: 2,
                groups: [{name: 'SME'}]
            },
            {
                id: 3,
                groups: [{name: 'Author'}]
            }
        ]
        let filteredUsers = service.filterByGroup(users, 'Author');
        expect(filteredUsers.length).toEqual(2);
        filteredUsers = service.filterByGroup(users, 'SME');
        expect(filteredUsers.length).toEqual(1);
        filteredUsers = service.filterByGroup(users, 'junk');
        expect(filteredUsers.length).toEqual(0);        
    });
});