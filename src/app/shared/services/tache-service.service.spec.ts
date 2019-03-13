import { TestBed } from '@angular/core/testing';

import { TacheServiceService } from './tache-service.service';

describe('TacheServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TacheServiceService = TestBed.get(TacheServiceService);
    expect(service).toBeTruthy();
  });
});
