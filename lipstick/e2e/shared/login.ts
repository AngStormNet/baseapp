import { browser, element, by } from 'protractor';

export class Login {
    // call this function with username and password and this function will
    // go to CONEX URL and login with provieded username & password

    performLogin(username, password) {
        // Login CONEX page using provided username and password
        browser.get('/');
        element(by.name("username")).sendKeys(username);
        element(by.name("password")).sendKeys(password);
        element(by.className("cx-button-action")).click().then(function () {
            // Verify the user menu exists
            var usermenu = element(by.className("btn btn-default cx-tt-initial dropdown-toggle"));
            expect(usermenu.isPresent()).toBe(true);
        });
    }
}