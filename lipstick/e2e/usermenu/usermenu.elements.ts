import { element, by } from 'protractor';


export class UserMenu {
	// return 5 item links on User Menu - 'Administration' Only displayed for Admin group user
	// openUserMenu and closeUserMenu to view User Menu Itesms.

	openUserMenu() {
		return element(by.className('btn btn-default cx-tt-initial dropdown-toggle')).click();
	}

	closeUserMenu() {
		return element(by.className('cx-header-li cx-header-logo')).click();
	}

	adminLink() {
		return element(by.partialLinkText("Administration"));
	}

	clientSubscriptionsLink() {
		return element(by.partialLinkText("Client Subscriptions"));
	}

	myAccountLink() {
		return element(by.partialLinkText("My Account"));
	}

	signOutLink() {
		return element(by.partialLinkText("Sign Out"));
	}
}