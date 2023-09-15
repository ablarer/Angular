import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbn'
})
export class IsbnPipe implements PipeTransform {
  transform(value: string | null): string {
    if (value === null || value === undefined) {
      return ''; // Return an empty string for null or undefined values
    }
    if (!value) {
      return '';
    }
    return `${value.substring(0, 3)}-${value.substring(3)}`;
  }
}
