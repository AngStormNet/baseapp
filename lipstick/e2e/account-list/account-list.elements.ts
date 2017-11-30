import { browser, element, by } from 'protractor';

export class AccountList {

    adminGroup() {
        return element(by.className('admin-groups'));
    }

    adminName() {
        return element(by.id('acc-list-admin'));
    }
}
