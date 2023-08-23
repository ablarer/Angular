import { Component } from '@angular/core';
import { Book } from '../../shared/book';

import { ActivatedRoute } from '@angular/router';
import { BookStoreService } from '../../shared/book-store.service';
import { switchMap } from 'rxjs/operators';

import { BookUIFacadeService } from '../../shared/book-ui-facade.service';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent {
  book?: Book;

  constructor(
    private service: BookStoreService,
    private uiFacade: BookUIFacadeService,
    private route: ActivatedRoute,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const isbn = this.route.snapshot.paramMap.get('isbn')!;
    this.service.getSingle(isbn).subscribe((book) => {
      this.book = book;
    });
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
