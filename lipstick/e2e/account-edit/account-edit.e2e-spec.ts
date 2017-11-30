import { Login } from '../shared/login';
import { Logout } from '../shared/logout';
import { UserMenu } from '../usermenu/usermenu.elements';
import { AccountList } from '../account-list/account-list.elements';
import { Admin } from '../admin/admin.elements';

import { AccountEdit } from './account-edit.elements';


describe('Account Edit group assignment', function() {
    let login: Login;
    login = new Login();

    let logout: Logout;
    logout = new Logout();

    let usermenu: UserMenu;
    usermenu = new UserMenu();

    let adminmenu: Admin;
    adminmenu = new Admin();

    let accountlist: AccountList;
    accountlist = new AccountList();

    let accountedit: AccountEdit;
    accountedit = new AccountEdit();

    beforeEach(() => {
        // Login and navigate to the Account List screen
        login.performLogin("admin", "cva.admin");
        usermenu.openUserMenu();
        usermenu.adminLink().click();
        adminmenu.accountsLink();
    });

    afterEach(() => {
        logout.performLogout();
    });

    it("should ensure account edit process is functional", () => {
        // Click the administrator name in account list to open edit modal
        expect(accountlist.adminName().isPresent()).toBe(true);
        accountlist.adminName().click();

        // Emulating drag-drop is nearly impossible.
        // Just save the current group.
        expect(accountedit.saveButton().isPresent()).toBe(true);
        accountedit.saveButton().click();

        // Return to the account list and make sure the admin is showing administrator
        expect(accountlist.adminGroup().getText()).toEqual("Administrator");
    });
})
