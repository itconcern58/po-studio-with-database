import { TestBed } from '@angular/core/testing';

import { DcaProdService } from './dca-prod.service';

describe('DcaProdService', () => {
  let service: DcaProdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DcaProdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
