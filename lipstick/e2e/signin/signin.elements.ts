import { browser, element, by } from 'protractor';

export class SignInPage {
    navigateTo() {
        return browser.get('/');
    }

    getUsername() {
        return element(by.name("username"));
    }

    getPassword() {
        return element(by.name("password"));
    }

    getAlertText() {
        return element(by.id('alert-message')).getText();
    }

    getBannerText() {
        return element(by.css('h2')).getText();
    }

    clickLoginButton() {
        return element(by.className("cx-button-action")).click()
    }

    clickForgotPassword() {
        return element(by.className('btn cx-forgot-password')).click()
    }

}
