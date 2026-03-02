import { Component, inject } from '@angular/core';
import { BookService } from '../book-service';
import { AsyncPipe } from '@angular/common';
import { BookSettingsPanel } from "../book-settings-panel/book-settings-panel";

@Component({
  selector: 'app-book-menu',
  imports: [AsyncPipe, BookSettingsPanel],
  templateUrl: './book-menu.html',
  styleUrl: './book-menu.scss',
})
export class BookMenu {
  private bookService = inject(BookService);
  isVisible = false;
  genres$ = this.bookService.genres$;
  selectedGenre$ = this.bookService.selectedGenre$;

  onSelect(genre: string | null) {
    this.bookService.filterByGenre(genre);
  }
}
