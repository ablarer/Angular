import { Component } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  iif,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
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
  protected readonly parent = parent;

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
}
