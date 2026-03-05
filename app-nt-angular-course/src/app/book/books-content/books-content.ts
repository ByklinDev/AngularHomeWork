import { Component, inject, input, signal } from '@angular/core';
import { BookService } from '../book-service';
import { BookCard } from '../book-card/book-card';
import { AsyncPipe, CommonModule } from '@angular/common';

import { BookMenu } from '../book-menu/book-menu';
import { Book } from '../book';
import { map } from 'rxjs';
import { FilterBooksPipe } from "../filter-books-pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books-content',
  imports: [BookCard, AsyncPipe, BookMenu, CommonModule, FilterBooksPipe, FormsModule],
  templateUrl: './books-content.html',
  styleUrl: './books-content.scss',
})
export class BooksContent {
  private bookService = inject(BookService);
  books$ = this.bookService.filteredBooks$;
  $searchTerm = signal('');
}
