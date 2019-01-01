import { TestBed } from '@angular/core/testing';

import { BcontrollerService } from './bcontroller.service';

describe('BcontrollerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BcontrollerService = TestBed.get(BcontrollerService);
    expect(service).toBeTruthy();
  });
});
