import { TestBed } from '@angular/core/testing';

import { FurnacedashService } from './furnacedash.service';

describe('FurnacedashService', () => {
  let service: FurnacedashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FurnacedashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
