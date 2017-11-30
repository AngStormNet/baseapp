import { element, by } from 'protractor';


export class AccountComponents {
	// return elements on Admin Account  - 1) Left Panel; 2) Title, 3) Data Table
	// this page only can be viewed by Admin group user

	selectAdmin() {
		return element(by.partialLinkText("Administration")).click();
	}

	titleLink() {
		return element(by.id("admin-title"));
	}

	nameLink() {
		return element(by.cssContainingText('.cx-table-admin','Name'));		
	}

	groupsLink() {
		return element(by.cssContainingText('.cx-table-admin','Group'));
	}

	emailLink() {
		return element(by.cssContainingText('.cx-table-admin','Email'));
	}
}