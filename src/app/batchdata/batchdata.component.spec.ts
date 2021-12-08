import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchdataComponent } from './batchdata.component';

describe('BatchdataComponent', () => {
  let component: BatchdataComponent;
  let fixture: ComponentFixture<BatchdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
