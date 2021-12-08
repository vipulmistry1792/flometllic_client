import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyconsumptionComponent } from './energyconsumption.component';

describe('EnergyconsumptionComponent', () => {
  let component: EnergyconsumptionComponent;
  let fixture: ComponentFixture<EnergyconsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyconsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyconsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
