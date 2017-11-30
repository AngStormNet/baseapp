import { Login } from '../shared/login';
import { Logout } from '../shared/logout';

import { UserMenu } from './usermenu.elements';


describe('Login View User Menu for Each Group User:', function() {
	// login as different group user and check 5 User Menu items displayed correctly for them
	// Only 'Admin' user can view the 'Administration' item, others only see the other 4 items

    let usermenu: UserMenu;
    usermenu = new UserMenu();

    let login: Login;
    login = new Login();

    let logout: Logout;
    logout = new Logout();

    afterEach(() => {
        usermenu.closeUserMenu();
        logout.performLogout();
    });
    
    it("View User Menu as Admin Group User", () => {
    	login.performLogin("admin", "cva.admin");
        usermenu.openUserMenu();

        expect(usermenu.adminLink().isPresent()).toBe(true);
        // expect(usermenu.clientSubscriptionsLink().isPresent()).toBe(true);
        expect(usermenu.myAccountLink().isPresent()).toBe(true);
        expect(usermenu.signOutLink().isPresent()).toBe(true);
    });

    it("View User Menu as Readonly Group User", () => {
    	login.performLogin("ray.ro", "cva.ray.ro");
        usermenu.openUserMenu();

        expect(usermenu.adminLink().isPresent()).toBe(false);
        expect(usermenu.clientSubscriptionsLink().isPresent()).toBe(false);
        expect(usermenu.myAccountLink().isPresent()).toBe(true);
        expect(usermenu.signOutLink().isPresent()).toBe(true);
    });
})