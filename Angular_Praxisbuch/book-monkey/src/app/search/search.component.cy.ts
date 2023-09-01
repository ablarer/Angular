import { provideHttpClientTesting} from "@angular/common/http/testing";
import { BookStoreService } from '../shared/book-store.service';
import { SearchComponent} from "./search.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('SearchComponent', () => {
  it('should display search results', () => {
    cy.mount(`<bm-search></bm-search>`, {
      declarations: [SearchComponent],
      providers: [BookStoreService],
      imports: [HttpClientModule],
    });
  });
});
