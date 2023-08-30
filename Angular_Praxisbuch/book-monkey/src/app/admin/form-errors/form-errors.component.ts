import { Component, Input } from '@angular/core';
import { FormArray, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'bm-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.css'],
})
export class FormErrorsComponent {
  @Input() controlName?: string;
  @Input() messages: { [errorCode: string]: string } = {};

  constructor(private form: FormGroupDirective) {
  }

  get errors(): string[] {
    if (!this.controlName) {
      return [];
    }

    const control = this.form.control.get(this.controlName);

    if (!control || !control.errors || !control.touched) {
      return [];
    }

    return Object.keys(control.errors).map((errorCode) => {
      return this.messages[errorCode];
    });
  }

  get authorsEmpty(): boolean {
    if (!this.controlName) {
      return false;
    }

    const control = this.form.control.get(this.controlName) as FormArray;

    if (!control || control.length === 0) {
      return true;
    }

    const nonEmptyAuthors = control.value.filter((author: string) => !!author.trim());
    return nonEmptyAuthors.length === 0;
  }
}
