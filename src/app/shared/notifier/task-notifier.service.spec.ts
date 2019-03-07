import { TestBed } from '@angular/core/testing';

import { TaskNotifierService } from './task-notifier.service';

describe('TaskNotifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskNotifierService = TestBed.get(TaskNotifierService);
    expect(service).toBeTruthy();
  });
});
