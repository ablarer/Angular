import { Component, EventEmitter, Output } from '@angular/core';

import { Book } from '../shared/book';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  books: Book[] = [];
  @Output() selectBook = new EventEmitter<Book>();

  constructor() {
    this.books = [
      {
        isbn: '12345',
        title: 'Super gut!',
        authors: ['Henry Miller', 'Anais Nin'],
        published: '01.02.1968',
        subtitle: 'Wer es glaubt.',
        thumbnailUrl: 'https://cdn.ng-buch.de/kochen.png',
        description: 'Fantasy',
      },
      {
        isbn: '54321',
        title: 'Noch besser!',
        authors: ['Ludwig van Bethoven', 'Klaus Kinski'],
        published: '01.02.2001',
        subtitle: 'Es wird noch besser.',
        thumbnailUrl: 'https://cdn.ng-buch.de/backen.png',
        description: 'Moderne Kunst und Musik',
      },
    ];
  }
  doSelect(book: Book) {
    this.selectBook.emit(book);
  }
}
