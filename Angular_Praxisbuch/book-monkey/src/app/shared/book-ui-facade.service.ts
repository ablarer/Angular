import { Injectable } from '@angular/core';
import { BookStoreService } from './book-store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface Response {
  success: boolean;
  // any other expected properties here
}

@Injectable({
  providedIn: 'root',
})
export class BookUIFacadeService {
  constructor(
    private bookStoreService: BookStoreService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  handleResponseWithUIFeedback(
    response: Response,
    successMessage: string,
    failureMessage: string,
    navigationPath?: string,
  ): Observable<void> {
    return new Observable((observer) => {
      if (response.success) {
        const snackBarRef = this.snackBar.open(successMessage, 'Close', {
          duration: 2000,
        });

        if (navigationPath) {
          snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigateByUrl(navigationPath);
            observer.next();
            observer.complete();
          });
        } else {
          observer.next();
          observer.complete();
        }
      } else {
        this.snackBar.open(failureMessage, 'Close', { duration: 2000 });
        observer.error(new Error(failureMessage));
      }
    });
  }
}
