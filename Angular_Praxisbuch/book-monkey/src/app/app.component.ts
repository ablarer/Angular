import { Component } from '@angular/core';
import { AuthService} from "./shared/auth.service";
import { Router } from '@angular/router';  // Add this import

@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    private router: Router,
  ) {} // Inject Router

  title = 'book-monkey';

  get isBooksRoute(): boolean {
    return this.router.url === '/books';
  }
}
