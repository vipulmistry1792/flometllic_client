import { TestBed } from '@angular/core/testing';

import { ShiftmasterService } from './shiftmaster.service';

describe('ShiftmasterService', () => {
  let service: ShiftmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
