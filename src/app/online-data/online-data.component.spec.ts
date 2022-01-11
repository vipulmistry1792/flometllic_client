import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineDataComponent } from './online-data.component';

describe('OnlineDataComponent', () => {
  let component: OnlineDataComponent;
  let fixture: ComponentFixture<OnlineDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
