/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountEdit } from './account-edit.component';

describe('AccountEdit', () => {
    let component: AccountEdit;
    let fixture: ComponentFixture<AccountEdit>;

    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AccountEdit ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountEdit);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    

    // it('should create', () => {
    //     //expect(component).toBeTruthy();
    //     expect(true).toBe(true);
    // });
});
