import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmenuComponent } from './adminmenu.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminmenuComponent', () => {
    let component: AdminmenuComponent;
    let fixture: ComponentFixture<AdminmenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AdminmenuComponent ],
            imports: [ RouterTestingModule ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminmenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
