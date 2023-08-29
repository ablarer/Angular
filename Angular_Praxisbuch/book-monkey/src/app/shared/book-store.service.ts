import { Injectable } from '@angular/core';

import { Book } from './book';

import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookStoreService {
  private apiUrl = 'https://api5.angular-buch.com';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`).pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      }),
    );
  }

  getAllSearch(term: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books/search/${term}`).pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      }),
    );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${isbn}`);
  }

  remove(isbn: string): Observable<RemoveResponse> {
    return this.http.delete<RemoveResponse>(`${this.apiUrl}/books/${isbn}`);
  }

  delete(): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${this.apiUrl}/books`);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  update(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/books/${book.isbn}`, book);
  }

  check(isbn: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/books/${isbn}check`);
  }
}

interface DeleteResponse {
  success: boolean;
}

interface RemoveResponse {
  success: boolean;
}
