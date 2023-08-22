import { Injectable } from '@angular/core';

import { Book } from './book';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class BookStoreService {
  private apiUrl = 'https://api5.angular-buch.com'
  private books: Book[] = [];

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
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
}

interface DeleteResponse {
  success: boolean;
}

interface RemoveResponse {
  success: boolean;
}
