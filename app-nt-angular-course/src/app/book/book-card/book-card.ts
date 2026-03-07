import { Component, inject, Input, input, signal, TemplateRef } from '@angular/core';
import { Book } from '../book';
import { ModalService } from '../../core/modal-service';
import { BookDetailsDialog } from '../book-details-dialog/book-details-dialog';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { HighRatingBookDirective } from '../high-rating-book-directive';
import { HighlightCardDirective } from '../../shared/directives/highlight-card-directive';
import { BookService } from '../book-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-book-card',
  imports: [NgTemplateOutlet, CommonModule, HighRatingBookDirective, HighlightCardDirective],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  private modalService: ModalService = inject(ModalService);
  protected bookService: BookService = inject(BookService);

  book = input<Book>();

  public isFavourite = toSignal(
    combineLatest([
      this.bookService.favoriteBooks$,
      toObservable(this.book), // Превращаем сигнал в поток, чтобы реагировать на смену книги
    ]).pipe(map(([favs, book]) => favs.some((f) => f.id === book?.id))),
    { initialValue: false },
  );

  @Input() customTemplate?: TemplateRef<any>;

  openBookDetails() {
    this.modalService.openViewContainerRef(BookDetailsDialog, { book: this.book() });
  }

  selectBook() {
    this.bookService.selectBookById(this.book()?.id ?? null);
  }

  addToFavorites($event: Event) {
    $event.stopPropagation();
    if (this.book()) {
      this.bookService.addToFavorites(this.book()!);
    }
  }
}
