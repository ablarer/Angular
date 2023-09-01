import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ActivatedRoute, convertToParamMap, NavigationBehaviorOptions, ParamMap, Router, UrlTree} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BookDetailsComponent } from './book-details.component';
import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';
import { BookUIFacadeService } from '../../shared/book-ui-facade.service';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let mockBookStoreService: Partial<BookStoreService>;
  let mockBookUIFacadeService: Partial<BookUIFacadeService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockRouter: Partial<Router>;

  const mockBook: Book = {
    isbn: '1234567890',
    title: 'Mock Book',
    authors: ['Author 1', 'Author 2'],
    published: '2023-09-01',
  };

  beforeEach(() => {
    mockBookStoreService = {
      getSingle: (isbn: string) => of(mockBook),
      remove: (isbn: string) => of({ success: true }),
    };

    mockBookUIFacadeService = {
      handleResponseWithUIFeedback: (
        response: any,
        successMessage: string,
        failureMessage: string,
        navigationPath?: string,
      ) => of(),
    };

    class MockActivatedRoute {
      paramMap = of(convertToParamMap({ isbn: '1234567890' }));
    }

    class MockRouter {
      navigateByUrl(url: string, extras?: NavigationBehaviorOptions): Promise<boolean> {
        return Promise.resolve(true);
      }
    }

    TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      providers: [
        { provide: BookStoreService, useValue: mockBookStoreService },
        { provide: BookUIFacadeService, useValue: mockBookUIFacadeService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should retrieve a book on initialization', () => {
  //   spyOn(mockBookStoreService, 'getSingle').and.callThrough();
  //   fixture.detectChanges();
  //   expect(mockBookStoreService.getSingle).toHaveBeenCalledWith('1234567890');
  //   expect(component.book$).toBeDefined();
  // });
  //
  // it('should remove a book', () => {
  //   spyOn(window, 'confirm').and.returnValue(true);
  //   spyOn(mockBookStoreService, 'remove').and.callThrough();
  //   spyOn(
  //     mockBookUIFacadeService,
  //     'handleResponseWithUIFeedback',
  //   ).and.callThrough();
  //   spyOn(mockRouter, 'navigateByUrl');
  //
  //   component.removeBook('1234567890');
  //   fixture.detectChanges();
  //
  //   expect(mockBookStoreService.remove).toHaveBeenCalledWith('1234567890');
  //   expect(
  //     mockBookUIFacadeService.handleResponseWithUIFeedback,
  //   ).toHaveBeenCalled();
  //   expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/books');
  // });
});
