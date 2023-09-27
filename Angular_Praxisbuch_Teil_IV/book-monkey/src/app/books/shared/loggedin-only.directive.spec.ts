import {ComponentFixture, TestBed} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggedinOnlyDirective } from './loggedin-only.directive';
import { AuthService } from '../../shared/auth.service';

@Component({
  template: `
    <div *bmLoggedinOnly>
      <p>Content shown when logged in</p>
    </div>
    <div>
      <p>Other content</p>
    </div>
  `,
})
class TestComponent {}

describe('LoggedinOnlyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedinOnlyDirective, TestComponent],
      providers: [AuthService],
    });

    fixture = TestBed.createComponent(TestComponent);
    authService = TestBed.inject(AuthService);
  });

  it('should create an instance', () => {
    const directive = new LoggedinOnlyDirective(
        null as any,
        null as any,
        authService
    );
    // @ts-ignore
    expect(directive).toBeTruthy();
  });

  it('should display content when user is authenticated', () => {
    const spy = jest
        .spyOn(authService['_isAuthenticated$'], 'asObservable')
        .mockReturnValue(new BehaviorSubject(true));

    fixture.detectChanges();

    const debugElement: DebugElement = fixture.debugElement.query(
        (de) => de.nativeElement.textContent.trim() === 'Content shown when logged in'
    );

    // @ts-ignore
    expect(debugElement).toBeTruthy();

    // Clean up the spy
    spy.mockRestore();
  });
});
