import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceSummaryComponent } from './leave-balance-summary.component';

describe('LeaveBalanceSummaryComponent', () => {
  let component: LeaveBalanceSummaryComponent;
  let fixture: ComponentFixture<LeaveBalanceSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveBalanceSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveBalanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
