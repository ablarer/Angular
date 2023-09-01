import { TestBed } from '@angular/core/testing';
import { BookUIFacadeService, Response } from './book-ui-facade.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('BookUIFacadeService', () => {
  let service: BookUIFacadeService;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        BookUIFacadeService,
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    service = TestBed.inject(BookUIFacadeService);
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
//
//   it('should handle a successful response with navigation', () => {
//     const response: Response = { success: true };
//     const successMessage = 'Success Message';
//     const navigationPath = '/success';
//
//     snackBar.open.and.returnValue({ afterDismissed: () => of({}) });
//     router.navigateByUrl.and.returnValue(Promise.resolve(true));
//
//     service
//       .handleResponseWithUIFeedback(response, successMessage, 'Failure Message', navigationPath)
//       .subscribe(() => {
//         expect(snackBar.open).toHaveBeenCalledWith(successMessage, 'Close', {
//           duration: 2000,
//         });
//         expect(router.navigateByUrl).toHaveBeenCalledWith(navigationPath);
//       });
//   });
//
//   it('should handle a successful response without navigation', () => {
//     const response: Response = { success: true };
//     const successMessage = 'Success Message';
//
//     snackBar.open.and.returnValue({ afterDismissed: () => of({}) });
//
//     service
//       .handleResponseWithUIFeedback(response, successMessage, 'Failure Message')
//       .subscribe(() => {
//         expect(snackBar.open).toHaveBeenCalledWith(successMessage, 'Close', {
//           duration: 2000,
//         });
//       });
//   });
//
//   it('should handle a failed response', () => {
//     const response: Response = { success: false };
//     const failureMessage = 'Failure Message';
//
//     snackBar.open.and.returnValue({ afterDismissed: () => of({}) });
//
//     service
//       .handleResponseWithUIFeedback(response, 'Success Message', failureMessage)
//       .subscribe({
//         error: (error) => {
//           expect(snackBar.open).toHaveBeenCalledWith(failureMessage, 'Close', {
//             duration: 2000,
//           });
//           expect(error.message).toBe(failureMessage);
//         },
//       });
//   });
// });
