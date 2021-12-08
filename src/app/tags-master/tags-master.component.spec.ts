import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsMasterComponent } from './tags-master.component';

describe('TagsMasterComponent', () => {
  let component: TagsMasterComponent;
  let fixture: ComponentFixture<TagsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
