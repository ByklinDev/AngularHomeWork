import { Component, input } from '@angular/core';
import { Book } from '../book';
import { HighRatingBookDirective } from '../high-rating-book-directive';

@Component({
  selector: 'app-book-details-dialog',
  imports: [HighRatingBookDirective],
  templateUrl: './book-details-dialog.html',
  styleUrl: './book-details-dialog.scss',
})
export class BookDetailsDialog {
  book = input<Book>();
}
