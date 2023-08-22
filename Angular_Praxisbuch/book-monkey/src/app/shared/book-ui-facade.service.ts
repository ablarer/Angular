import { Injectable } from '@angular/core';
import { BookStoreService } from './book-store.service';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookUIFacadeService {

  constructor(
    private bookStoreService: BookStoreService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  snackBarMessage(message: string, action: string = 'Close'): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  handleResponseWithUIFeedback(
    response: any,
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
