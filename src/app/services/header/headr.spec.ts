import { TestBed } from '@angular/core/testing';

import { Headr } from './headr';

describe('Headr', () => {
  let service: Headr;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Headr);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
