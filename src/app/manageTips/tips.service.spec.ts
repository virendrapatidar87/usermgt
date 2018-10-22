import { TestBed, inject } from '@angular/core/testing';

import { TipsService } from './tips.service';

describe('TipsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipsService]
    });
  });

  it('should be created', inject([TipsService], (service: TipsService) => {
    expect(service).toBeTruthy();
  }));
});
