import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router'; // Add this import

@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'book-monkey';

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {} // Inject Router

  get isBooksRoute(): boolean {
    return this.router.url === '/books';
  }

  get isAdminRoute(): boolean {
    return this.router.url === '/admin/create';
  }

  get isBooksSubdirectories(): boolean {
    return this.router.url.startsWith('/books');
  }
}
