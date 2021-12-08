import { TestBed } from '@angular/core/testing';

import { MachineMasterService } from './machine-master.service';

describe('MachineMasterService', () => {
  let service: MachineMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
