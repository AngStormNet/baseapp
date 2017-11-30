/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountList } from './account-list.component';

describe('AccountList', () => {
    let component: AccountList;
    let fixture: ComponentFixture<AccountList>;

    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AccountList ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountList);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    

    // it('should create', () => {
    //     //expect(component).toBeTruthy();
    //     expect(true).toBe(true);
    // });
});
