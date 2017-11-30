import { Login } from './login';
import { Logout } from './logout';


describe('System Login & Logout', function() {
    let login: Login;
    login = new Login();

    it("should login using the login function", () => {
        login.performLogin("admin", "cva.admin");
    });

    let logout: Logout;
    logout = new Logout();

    it("should logout using the logout function", () => {
        logout.performLogout();
    });
})