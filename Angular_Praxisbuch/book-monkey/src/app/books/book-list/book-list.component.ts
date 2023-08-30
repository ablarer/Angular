import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import the tap operator

import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';
import { switchMap } from 'rxjs/operators';

import { BookUIFacadeService } from '../../shared/book-ui-facade.service';

import { LoggedinOnlyDirective } from "../shared/loggedin-only.directive";
import { AuthService } from "../../shared/auth.service";

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  books$: Observable<Book[]>;

  constructor(private service: BookStoreService, private uiFacade: BookUIFacadeService) {
    this.books$ = this.service.getAll();
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
