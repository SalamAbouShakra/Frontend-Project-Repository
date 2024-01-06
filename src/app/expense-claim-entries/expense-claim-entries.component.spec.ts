import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseClaimEntriesComponent } from './expense-claim-entries.component';

describe('ExpenseClaimEntriesComponent', () => {
  let component: ExpenseClaimEntriesComponent;
  let fixture: ComponentFixture<ExpenseClaimEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseClaimEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseClaimEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
