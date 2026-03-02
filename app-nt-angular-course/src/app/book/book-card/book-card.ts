import { Component, inject, Input, input, TemplateRef } from '@angular/core';
import { Book } from '../book';
import { ModalService } from '../../core/modal-service';
import { BookDetailsDialog } from '../book-details-dialog/book-details-dialog';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { HighRatingBookDirective } from '../high-rating-book-directive';

@Component({
  selector: 'app-book-card',
  imports: [NgTemplateOutlet, CommonModule, HighRatingBookDirective],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  private modalService: ModalService = inject(ModalService);
  book = input<Book>();
  
  @Input() customTemplate?: TemplateRef<any>;

  openBookDetails() {
    this.modalService.openViewContainerRef(BookDetailsDialog, { book: this.book() });
  }
}
