import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';

import { BookUIFacadeService } from '../../shared/book-ui-facade.service';
import {AsyncPipe, NgFor, NgIf} from "@angular/common";
import {BookListItemComponent} from "../book-list-item/book-list-item.component";

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, BookListItemComponent]
})
export class BookListComponent {
  books$: Observable<Book[]>;

  constructor(private service: BookStoreService) {
    this.books$ = this.service.getAll();
  }
}
