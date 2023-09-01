import { Component } from '@angular/core';
import { Book } from '../../shared/book';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../../shared/book-store.service';
import { switchMap } from 'rxjs/operators';

import { BookUIFacadeService } from '../../shared/book-ui-facade.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { IsbnPipe } from '../../shared/isbn.pipe';
import { LoggedinOnlyDirective } from '../../shared/loggedin-only.directive';
import { ConfirmDirective } from '../../shared/confirm.directive';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    AsyncPipe,
    RouterLink,
    IsbnPipe,
    LoggedinOnlyDirective,
    ConfirmDirective,
  ],
})
export class BookDetailsComponent {
  book$: Observable<Book>;

  constructor(
    private service: BookStoreService,
    private uiFacade: BookUIFacadeService,
    private route: ActivatedRoute,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const isbn = this.route.snapshot.paramMap.get('isbn')!;
    // Make sure 'isbn' is a string
    this.book$ = this.service.getSingle(isbn);
  }

  removeBook(isbn: string) {
    if (window.confirm('Do you really want to remove the book?')) {
      this.service
        .remove(isbn)
        .pipe(
          switchMap((response) =>
            this.uiFacade.handleResponseWithUIFeedback(
              response,
              'The removing of the book was successful!',
              'The removing of the book failed!',
              '/books', // Providing navigationPath here to navigate after snackbar disappears
            ),
          ),
        )
        .subscribe();
    }
  }
}
