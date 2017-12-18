import { TestBed, inject } from '@angular/core/testing';

import { AdminStatisticsService } from './admin-statistics.service';

describe('AdminStatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminStatisticsService]
    });
  });

  it('should be created', inject([AdminStatisticsService], (service: AdminStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
