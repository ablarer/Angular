import { Component } from '@angular/core';

import { BookStoreService } from '../../shared/book-store.service';
import { Book } from '../../shared/book';
import { Router } from '@angular/router';
import {switchMap, tap} from "rxjs/operators";

import { BookUIFacadeService} from "../../shared/book-ui-facade.service";
import {Observable} from "rxjs";

@Component({
  selector: 'bm-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent {
  books$: Observable<Book[]>;
  constructor(
    private service: BookStoreService,
    private router: Router,
    private uiFacade: BookUIFacadeService
  ) {this.books$ = this.service.getAll();}

  create(book: Book) {
    this.service.create(book).subscribe((createBook) => {
      this.router.navigate(['/books', createBook.isbn]);
    });
  }
  restoreBookList() {
    if (window.confirm('Do you really want to restore the book list?')) {
      this.service
        .delete()
        .pipe(
          switchMap((response) =>
            this.uiFacade.handleResponseWithUIFeedback(
              response,
              'Restore successful!',
              'Restore failed!',
            )
          ),
          // After the restoration is successful, update the books$ observable
          tap(() => {
            this.books$ = this.service.getAll();
          })
        )
        .subscribe();
    }
  }
}
