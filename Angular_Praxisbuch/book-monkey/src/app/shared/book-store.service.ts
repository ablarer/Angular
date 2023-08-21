import { Injectable } from '@angular/core';

import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookStoreService {
  private books: Book[] = [];

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

  getAll(): Book[] {
    return this.books;
  }

  getSingle(isbn: string): Book | undefined {
    return this.books.find((book) => book.isbn === isbn);
  }
}
