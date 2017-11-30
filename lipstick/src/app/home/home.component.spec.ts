/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import {
    AlertService,
    UserService,
    ValuelistService,
} from '../_services/index';
import { HomeComponent } from './home.component';
import { UsermenuComponent } from '../usermenu/usermenu.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        let userString = '{"token":"694eac6c5c32d22f42dd0501daea06642ca40a5e","first_name":"admin","id":1,"email":"admin@ray.com","last_name":"TestUser","profile":{"id":1,"clients":[{"id":2,"abbr":"1","enabled":true,"name":"Client 1","pm_id":"AC1"},{"id":4,"abbr":"cA","enabled":true,"name":"Client A","pm_id":"capm"}],"user":1},"groups":["Administrator","Author","Engineer","Liaison","QA","SME"],"permissions":["cxe.add_threatactor","cxe.change_threatactor","cxe.change_siteconfiguration","cxe.change_custominput","cxe.view_client_name","cxe.add_comment","cxe.delete_client","cxe.add_client","cxe.change_attackphase","cxe.delete_protocol","cxe.change_comment","cxe.add_appliance","cxe.add_protocol","cxe.add_packet","cxe.change_protocol","cxe.delete_threatcategory","cxe.add_rule","cxe.change_client","cxe.change_dependency","cxe.delete_threatactor","cxe.add_log","cxe.delete_dependency","cxe.change_rule","cxe.change_platform","cxe.add_custominput","auth.change_user","cxe.change_log","cxe.change_packet","cxe.change_threatcategory","cxe.add_platform","cxe.add_dependency","cxe.delete_platform","cxe.add_deployment","cxe.change_appliance","cxe.add_threatcategory","cxe.change_profile","cxe.delete_appliance","cxe.add_attackphase"]}';
        localStorage.setItem('currentUser', userString);
        TestBed.configureTestingModule({
            declarations: [ HomeComponent, UsermenuComponent ],
            imports: [ HttpModule, RouterTestingModule ],
            providers: [
                AlertService,
                UserService,
                ValuelistService
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Joey needs to fix this...
    // "Some of your tests did a full page reload!"
    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
