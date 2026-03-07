import { Component, inject, input, output, signal } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { HighlightTextPipe } from "../../shared/highlight-text-pipe";

@Component({
  selector: 'app-book-table',
  imports: [HighlightTextPipe],
  templateUrl: './book-table.html',
  styleUrl: './book-table.scss',
})
export class BookTable {
  public columns: { key: keyof Book; label: string }[] = [
    { key: 'title', label: 'Название' },
    { key: 'author', label: 'Автор' },
    { key: 'year', label: 'Год' },
  ];

  bookService = inject(BookService);
  books = input.required<Book[]>();
  favorites = input<Book[]>([]);

  onAddFavorite = output<Book>();
  onDetails = output<Book>();
  onDelete = output<Book>();

  searchTerm = toSignal(this.bookService.searchTerm$, { initialValue: '' });

  handleFavoriteClick(book: Book, event: Event) {
    event.stopPropagation;
    this.onAddFavorite.emit(book);
  }

  handleOpenDetailsClick(book: Book, event: Event) {
    event.stopPropagation;
    this.onDetails.emit(book);
  }

  handleDeleteClick(book: Book, event: Event) {
    event.stopPropagation();
    this.onDelete.emit(book);
  }

  isFavorite(bookId: number): boolean {
    return this.favorites().some((fav) => fav.id === bookId);
  }
}
