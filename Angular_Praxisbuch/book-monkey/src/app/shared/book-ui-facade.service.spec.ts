import { TestBed } from '@angular/core/testing';

import { BookUIFacadeService } from './book-ui-facade.service';

describe('BookUiFacadeService', () => {
  let service: BookUIFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookUIFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
