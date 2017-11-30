/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    MaterialModule,
    MdInputModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginInterface } from '../_interfaces/index';
import { AlertService, AuthenticationService } from '../_services/index';
import { AlertComponent } from '../_directives/alert.component';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AlertComponent, LoginComponent ],
            imports: [ 
                BrowserAnimationsModule,
                FormsModule,
                HttpModule,
                MaterialModule,
                MdInputModule, 
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [ AlertService, AuthenticationService ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
