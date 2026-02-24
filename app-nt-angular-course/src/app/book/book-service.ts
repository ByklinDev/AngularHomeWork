import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Book } from './book';
import { MOCK_BOOKS } from './book-mock';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>(MOCK_BOOKS);
  private genresSubject = new BehaviorSubject<string[]>([]);
  private selectedGenreSource = new BehaviorSubject<string | null>(null);

  books$ = this.booksSubject.asObservable();
  genres$ = this.genresSubject.asObservable();
  selectedGenre$ = this.selectedGenreSource.asObservable();

  filteredBooks$ = combineLatest([this.booksSubject, this.selectedGenreSource]).pipe(
    map(([books, selectedGenre]) => {
      console.log('Filtering books with genre:', selectedGenre);
      if (!selectedGenre) return books;
      return books.filter((book) => book.genre === selectedGenre);
    }),
  );

  constructor() {
    this.books$
      .pipe(
        map((books: Book[]) => {
          const uniqueGenres = [...new Set(books.map((book) => book.genre))];
          return uniqueGenres.sort((a, b) => a.localeCompare(b));
        }),
      )
      .subscribe((genres) => {
        this.genresSubject.next(genres);
      });
  }

  sortBooks(criterion: keyof Book, ascending: boolean = true) {
    const currentBooks = [...this.booksSubject.value];
    const sorted = currentBooks.sort((a, b) => {
      const valA = a[criterion];
      const valB = b[criterion];

      if (valA === valB) return 0;

      const comparison = valA! > valB! ? 1 : -1;
      return ascending ? comparison : -comparison;
    });
    this.booksSubject.next(sorted);
  }

  filterByGenre(genre: string | null) {
    console.log('Filtering by genre:', genre);
    this.selectedGenreSource.next(genre);
  }
}
