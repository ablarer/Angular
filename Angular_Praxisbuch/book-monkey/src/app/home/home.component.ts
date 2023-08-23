import { Component } from '@angular/core';

import { BookStoreService } from '../shared/book-store.service';
import { switchMap } from 'rxjs/operators';

import { BookUIFacadeService } from '../shared/book-ui-facade.service';

@Component({
  selector: 'bm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private service: BookStoreService,
    private uiFacade: BookUIFacadeService,
  ) {}

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
              // Notice: No navigationPath provided here, so it stays on the same page
            ),
          ),
        )
        .subscribe();
    }
  }
}
