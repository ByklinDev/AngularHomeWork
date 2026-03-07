import { Component, inject } from '@angular/core';
import { BookService } from '../book-service';
import { Book } from '../book';

@Component({
  selector: 'app-book-settings-panel',
  imports: [],
  templateUrl: './book-settings-panel.html',
  styleUrl: './book-settings-panel.scss',
})
export class BookSettingsPanel {
  public bookService = inject(BookService);
  protected isAsc = true;

  onSort(criterion: string) {
    this.isAsc = !this.isAsc;
    this.bookService.sortBooks(criterion as keyof Book);
  }
}
