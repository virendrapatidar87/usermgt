import { TestBed, inject } from '@angular/core/testing';

import { UsersvcService } from './usersvc.service';

describe('UsersvcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersvcService]
    });
  });

  it('should be created', inject([UsersvcService], (service: UsersvcService) => {
    expect(service).toBeTruthy();
  }));
});
