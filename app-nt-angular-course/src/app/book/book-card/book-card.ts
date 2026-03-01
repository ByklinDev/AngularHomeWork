import { Component, inject, Input, input, signal, TemplateRef } from '@angular/core';
import { Book } from '../book';
import { ModalService } from '../../core/modal-service';
import { BookDetailsDialog } from '../book-details-dialog/book-details-dialog';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { HighRatingBookDirective } from '../high-rating-book-directive';
import { HighlightCardDirective } from '../../shared/directives/highlight-card-directive';
import { BookService } from '../book-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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

  isFavourite = toSignal(
  this.bookService.favoriteBooks$.pipe(
    map(favs => favs.some(f => f.id === this.book()?.id))
  ), 
  { initialValue: false }
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

  isBookFavorite(): boolean {
    return this.bookService.isFavorite(this.book()!);
  }
}
