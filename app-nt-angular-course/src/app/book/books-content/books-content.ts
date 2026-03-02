import { Component, inject } from '@angular/core';
import { BookService } from '../book-service';
import { BookCard } from '../book-card/book-card';
import { AsyncPipe} from '@angular/common';

import { BookMenu } from "../book-menu/book-menu";

@Component({
  selector: 'app-books-content',
  imports: [BookCard, AsyncPipe, BookMenu],
  templateUrl: './books-content.html',
  styleUrl: './books-content.scss',
})
export class BooksContent {
  private bookService = inject(BookService);
  books$ = this.bookService.filteredBooks$;
}
  