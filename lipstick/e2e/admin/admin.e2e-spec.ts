import { Login } from '../shared/login';
import { Logout } from '../shared/logout';
import { UserMenu } from '../usermenu/usermenu.elements'
import { Admin } from './admin.elements';


describe('Admin Tests', function() {
	// login as Admin group user and click User Menu to select Admin item
	// Check the  Left Panel 9 items

    let admin: Admin;
    admin = new Admin();

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
        admin.selectAdmin();

        expect(admin.accountsLink().isPresent()).toBe(true);
        expect(admin.settingsLink().isPresent()).toBe(true);
    });

    it("Settings", () => {
    	login.performLogin("admin", "cva.admin");
        usermenu.openUserMenu();
        admin.selectAdmin();

        admin.settingsLink().click();
        expect(admin.title().getText()).toBe("Settings");
        // admin.objectCard().click();
        // expect(admin.objectEdit().isPresent()).toBe(true);
        // expect(admin.objectName().getAttribute('value')).toBe("RULE_ARCHIVE_DAYS")
    });

})
