import { browser, element, by } from 'protractor';

export class Logout {
    // call this function to logout of CONEX
    
    performLogout() {
        // Logout of CONEX System
        // Make sure the user menu exists.
        var usermenu = element(by.className("btn btn-default cx-tt-initial dropdown-toggle"));
        expect(usermenu.isPresent()).toBe(true);
        // Open the user menu
        usermenu.click();
        element.all(by.linkText('Sign Out')).click().then(function () {
            // Verify the password field exists
            var password_field = element(by.name("password"));
            expect(password_field.isPresent()).toBe(true);
        });
    }
}