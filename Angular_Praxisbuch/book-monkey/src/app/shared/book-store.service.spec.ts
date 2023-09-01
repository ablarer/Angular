import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookStoreService } from './book-store.service';
import { Book } from './book';

describe('BookStoreService', () => {
  let service: BookStoreService;
  let httpMock: HttpTestingController;

  const dummyBooks: Book[] = [
    // Your dummy book data here
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [BookStoreService],
    });

    service = TestBed.inject(BookStoreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of books', () => {
    // Mock the HTTP request
    service.getAll().subscribe((books) => {
      expect(books).toEqual(dummyBooks);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/books`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBooks); // Respond with the dummy data
  });

  // Similar tests for other methods like getAllSearch, getSingle, remove, delete, create, update, and check.
});
