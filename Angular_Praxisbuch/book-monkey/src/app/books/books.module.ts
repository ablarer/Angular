import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';

import {IsbnPipe} from "../shared/isbn.pipe";
import {ConfirmDirective} from "../shared/confirm.directive";
import {LoggedinOnlyDirective} from "../shared/loggedin-only.directive";


@NgModule({
  declarations: [
  ],
  imports: [CommonModule, BooksRoutingModule, IsbnPipe, ConfirmDirective, LoggedinOnlyDirective, NgOptimizedImage],
})
export class BooksModule {}
