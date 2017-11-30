import { browser, element, by } from 'protractor';

export class AccountEdit {

    saveButton() {
        return element(by.className('cx-button-action'));
    }
}   