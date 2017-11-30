import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminListComponent } from './admin-list.component';
import { AlertComponent } from '../../_directives/index';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import {
    MaterialModule,
} from '@angular/material';
import { AdminDetailComponent } from '../admin-detail/admin-detail.component';
import { AdminService, AlertService, UserService } from '../../_services/index';



describe('AdminListComponent', () => {
  let component: AdminListComponent;
  let fixture: ComponentFixture<AdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent, AdminListComponent, AdminDetailComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpModule,
        MaterialModule,
        ],
        providers: [ AdminService, AlertService, UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//    it('should be created', () => {
//      expect(component).toBeTruthy();
//    });
});
