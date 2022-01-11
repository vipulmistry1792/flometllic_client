import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyconsumptionhourlyComponent } from './energyconsumptionhourly.component';

describe('EnergyconsumptionhourlyComponent', () => {
  let component: EnergyconsumptionhourlyComponent;
  let fixture: ComponentFixture<EnergyconsumptionhourlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyconsumptionhourlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyconsumptionhourlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
