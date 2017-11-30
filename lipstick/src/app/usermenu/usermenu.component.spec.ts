/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService } from '../_services/index';
import { UsermenuComponent } from './usermenu.component';

describe('UsermenuComponent', () => {
    let component: UsermenuComponent;
    let fixture: ComponentFixture<UsermenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UsermenuComponent ],
            imports: [ HttpModule, RouterTestingModule ],
            providers: [ UserService, ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsermenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
