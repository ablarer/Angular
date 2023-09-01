import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Book } from '../../shared/book';
import { By } from '@angular/platform-browser';
import { IsbnPipe } from '../../shared/isbn.pipe';
import { RouterLinkWithHref } from '@angular/router';
import { BookListItemComponent } from './book-list-item.component';

// Create a mock component for the router link
@Component({
  selector: 'a[routerLink]',
  template: '<ng-content></ng-content>',
})
class RouterLinkMockComponent {}

describe('BookListItemComponent', () => {
  let fixture: ComponentFixture<BookListItemComponent>;
  let component: BookListItemComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookListItemComponent, RouterLinkMockComponent],
      providers: [IsbnPipe], // Mock any necessary providers
    });

    fixture = TestBed.createComponent(BookListItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display book title and author', () => {
    const book: Book = {
      isbn: '1234567890',
      title: 'Test Book',
      authors: ['Author 1', 'Author 2'],
    };

    component.book = book;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.book-title')).nativeElement;
    const authorElement = fixture.debugElement.query(By.css('.book-authors')).nativeElement;

    expect(titleElement.textContent).toContain(book.title);
    expect(authorElement.textContent).toContain(book.authors.join(', '));
  });

  it('should use ISBN pipe for ISBN display', () => {
    const book: Book = {
      isbn: '1234567890',
      title: 'Test Book',
      authors: ['Author 1', 'Author 2'],
    };

    component.book = book;
    fixture.detectChanges();

    const isbnElement = fixture.debugElement.query(By.css('.book-isbn')).nativeElement;

    // Get the instance of IsbnPipe from the fixture
    const isbnPipe = TestBed.inject(IsbnPipe);

    // Use the pipe to format the ISBN
    const formattedIsbn = isbnPipe.transform(book.isbn);

    expect(isbnElement.textContent).toContain(formattedIsbn);
  });

  it('should have a router link to the book details page', () => {
    const book: Book = {
      isbn: '1234567890',
      title: 'Test Book',
      authors: ['Author 1', 'Author 2'],
    };

    component.book = book;
    fixture.detectChanges();

    const routerLink = fixture.debugElement.query(By.directive(RouterLinkWithHref)).injector.get(RouterLinkWithHref);

    expect(routerLink.href).toBe(`/books/${book.isbn}`);
  });
});
