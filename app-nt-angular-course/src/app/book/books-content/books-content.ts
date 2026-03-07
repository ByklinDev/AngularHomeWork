import { Component, inject, input, signal } from '@angular/core';
import { BookService } from '../book-service';
import { BookCard } from '../book-card/book-card';
import { AsyncPipe, CommonModule } from '@angular/common';

import { BookMenu } from '../book-menu/book-menu';
import { Book } from '../book';
import { map } from 'rxjs';
import { FilterBooksPipe } from '../filter-books-pipe';
import { FormsModule } from '@angular/forms';
import { BookTable } from '../book-table/book-table';
import { ModalService } from '../../core/modal-service';
import { BookDetailsDialog } from '../book-details-dialog/book-details-dialog';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-books-content',
  imports: [BookCard, AsyncPipe, BookMenu, CommonModule, FilterBooksPipe, FormsModule, BookTable],
  templateUrl: './books-content.html',
  styleUrl: './books-content.scss',
})
export class BooksContent {
  protected bookService = inject(BookService);
  private modalService = inject(ModalService);

  books$ = this.bookService.filteredBooks$;
  $favs = toSignal(this.bookService.favoriteBooks$, {initialValue: []});

  $searchTerm = signal('');
  
  addToFavorite(book: Book) {
    this.bookService.addToFavorites(book);
  }

  openDetails(book: Book) {
    this.modalService.openViewContainerRef(BookDetailsDialog, { book: book });
  }

  deleteBook(book: Book){
    this.bookService.deleteBook(book);
  }
}
