import { TestBed } from '@angular/core/testing';

import { BatchDetailService } from './batch-detail.service';

describe('BatchDetailService', () => {
  let service: BatchDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
