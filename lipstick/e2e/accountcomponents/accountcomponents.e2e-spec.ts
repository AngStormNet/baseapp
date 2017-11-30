import { Login } from '../shared/login';
import { Logout } from '../shared/logout';

import { UserMenu } from '../usermenu/usermenu.elements'

import { AccountComponents } from './accountcomponents.elements';


describe('Login View Admin Account Components as Admin Group User:', function() {
	// login as Admin group user and click User Menu to select Admin item
	// Accounts page is the default and check the Account Table Title and 3 columns

    let accountcomponents: AccountComponents;
    accountcomponents = new AccountComponents();

    let usermenu: UserMenu;
    usermenu = new UserMenu();

    let login: Login;
    login = new Login();

    let logout: Logout;
    logout = new Logout();
    
    afterEach(() => {
        logout.performLogout();
    })

    it("View Admin Account Page Components as Admin Group User", () => {
    	login.performLogin("admin", "cva.admin");
        usermenu.openUserMenu();
        accountcomponents.selectAdmin();

        expect(accountcomponents.titleLink().getText()).toBe("Accounts");
        expect(accountcomponents.nameLink().isPresent()).toBe(true);     
        expect(accountcomponents.groupsLink().isPresent()).toBe(true);   
        expect(accountcomponents.emailLink().isPresent()).toBe(true);    
    });
})