import { SignInPage } from './signin.elements';

describe('Sign In', function() {
    let page: SignInPage;

    beforeEach(() => {
        page = new SignInPage();
    });

    it('Should display message Sign in', () => {
        page.navigateTo();
        expect(page.getBannerText()).toEqual('Sign in');
    });

    it('Sign in should fail', () => {
        //Try to login and expect a failed login.
        page.navigateTo();

        var username = page.getUsername();
        username.sendKeys("bad_user");

        var password = page.getPassword();
        password.sendKeys("abc@123");

        page.clickLoginButton();

        expect(page.getAlertText()).toEqual(
            "Unable to log in with provided credentials."
        );
    });

    it ('Get Help Info for Forgot Password', ()=> {
        // check Help info displayed when click Forgot Password link
        page.navigateTo();

        page.clickForgotPassword();

        expect(page.getAlertText()).toEqual(
            "Please use your Active Directory credentials to sign in"
        );
    })
});