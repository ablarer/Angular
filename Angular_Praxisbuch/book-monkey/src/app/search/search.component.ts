import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  iif,
  of,
} from 'rxjs';

import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  input$ = new Subject<string>();
  isLoading = false;

  results$: Observable<Book[]>;

  constructor(private service: BookStoreService) {
    this.results$ = this.input$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => (this.isLoading = true)),
      switchMap((term) =>
        iif(() => term.length >= 1, this.service.getAllSearch(term), of([])),
      ),
      tap(() => (this.isLoading = false)),
    );
  }

  protected readonly parent = parent;
}
