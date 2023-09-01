import { Component, Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Directive({
  selector: '[bmLoggedinOnly]',
})
class MockLoggedinOnlyDirective {
  constructor(
    private template: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.authService.isAuthenticated$
      .pipe(takeUntil(new Subject<void>()))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.viewContainer.createEmbeddedView(this.template);
        } else {
          this.viewContainer.clear();
        }
      });
  }
}

@Component({
  template: `
    <div *bmLoggedinOnly>
      Content for authenticated users
    </div>
  `,
})
class TestComponent {}

describe('LoggedinOnlyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, MockLoggedinOnlyDirective],
      providers: [AuthService],
    });
    fixture = TestBed.createComponent(TestComponent);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should display content for authenticated users', () => {
    authService.login(); // Set authentication to true
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div');
    expect(element.textContent.trim()).toBe('Content for authenticated users');
  });

  it('should clear content for non-authenticated users', () => {
    authService.logout(); // Set authentication to false
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div');
    expect(element).toBeFalsy();
  });
});
