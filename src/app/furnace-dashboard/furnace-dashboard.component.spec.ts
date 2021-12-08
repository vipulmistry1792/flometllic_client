import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnaceDashboardComponent } from './furnace-dashboard.component';

describe('FurnaceDashboardComponent', () => {
  let component: FurnaceDashboardComponent;
  let fixture: ComponentFixture<FurnaceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurnaceDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnaceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
