import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchsummaryComponent } from './batchsummary.component';

describe('BatchsummaryComponent', () => {
  let component: BatchsummaryComponent;
  let fixture: ComponentFixture<BatchsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchsummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
