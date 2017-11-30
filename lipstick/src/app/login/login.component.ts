import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginInterface } from '../_interfaces/index';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

    // Login interface and reactive form
    loginInterface: LoginInterface;
    loginForm: FormGroup;

    loading = false;
    returnUrl: string;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // get return url from route parameters or default to the dashboard
        const defaultUrl = '/dashboard';
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || defaultUrl;
        if(this.returnUrl == '/') {
            this.returnUrl = defaultUrl;
        }

        let body = document.getElementsByTagName('body')[0];
        body.style.background = 'url(../../assets/images/login_background.png) no-repeat center center fixed';
        body.style.backgroundSize = 'cover';
        body.style['-webkit-background-size']  = 'cover';
        body.style['-moz-background-size']  = 'cover';
        body.style['-o-background-size']  = 'cover';

        // Create the reactive form with default (blank) values
        this.loginForm = this.formBuilder.group({
            password: ['', [Validators.required]],
            username: ['', [Validators.required]],
        })
    }

    login({value, valid}: {value: LoginInterface, valid: boolean}) {
        // Send user credentials and forward or display error dependon on response
        this.loading = true;
        this.authenticationService.login(value)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    // Parse for errors
                    var errors = JSON.parse(error._body);
                    var keys = Object.keys(errors);
                    var err : any;
                    if(keys.length > 0) {
                        for (var i = 0; i < keys.length; i++){
                            //Don't show key on non field errors
                            err = errors[keys[i]][0];
                        }
                    } else {
                        // if this is an error other than not authorized
                        // or blank user/pass then return original error
                        var err = error;
                    }

                    this.alertService.error(err);
                    this.loading = false;
                });
    }

    showHelp(){
        // display message when user clicks forgotten password
        let helpMsg: string = "Please use your Active Directory credentials to sign in";
        this.alertService.help(helpMsg);
    }
}
