import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailComponent } from './admin-detail.component';
import { AlertComponent } from '../../_directives/index';

describe('AdminDetailComponent', () => {
  let component: AdminDetailComponent;
  let fixture: ComponentFixture<AdminDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent, AdminDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });
});
