import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Book } from './book';
import { MOCK_BOOKS } from './book-mock';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>(MOCK_BOOKS);
  private genresSubject = new BehaviorSubject<string[]>([]);
  private selectedGenreSource = new BehaviorSubject<string | null>(null);
  private selectedBookIdSource = new BehaviorSubject<number | null>(null);
  private favoriteBooksSubject = new BehaviorSubject<Book[]>([]);
  private searchTermSource = new BehaviorSubject<string>('');

  books$ = this.booksSubject.asObservable();
  genres$ = this.genresSubject.asObservable();
  selectedGenre$ = this.selectedGenreSource.asObservable();
  selectedBookId$ = this.selectedBookIdSource.asObservable();
  searchTerm$ = this.searchTermSource.asObservable().pipe(
  debounceTime(300),
  distinctUntilChanged()
);;

  favoriteBooks$ = this.favoriteBooksSubject.asObservable();

  sortState = signal<{ criterion: keyof Book, ascending: boolean } | null>(null);

  readonly isTableView = signal<boolean>(false);

  toggleView() {
    this.isTableView.update((view) => !view);
    console.log('Текущий вид:', this.isTableView());
  }

  filteredBooks$ = combineLatest([
    this.booksSubject,
    this.selectedGenreSource,
    this.searchTermSource,
  ]).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map(([books, selectedGenre, searchTerm]) => {
      return books.filter((book) => {
        const matchesGenre = !selectedGenre || book.genre === selectedGenre;
        const matchesSearch =
          book.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
          book.author.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
        return matchesGenre && matchesSearch;
      });
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

  sortBooks(criterion: keyof Book) {
    const currentState = this.sortState();
    const isSameCriterion = currentState?.criterion === criterion;
    const newAscending = isSameCriterion ? !currentState.ascending : true;

    const currentBooks = [...this.booksSubject.value];
    const sorted = currentBooks.sort((a, b) => {
      const valA = a[criterion];
      const valB = b[criterion];

      if (valA === valB) return 0;

      const comparison = valA! > valB! ? 1 : -1;
      return newAscending ? comparison : -comparison;
    });
    this.booksSubject.next(sorted);
    this.sortState.set({criterion, ascending: newAscending});
  }

  filterByGenre(genre: string | null) {
    console.log('Filtering by genre:', genre);
    this.selectedGenreSource.next(genre);
  }

  setSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }

  selectBookById(bookId: number | null) {
    const nextId = this.selectedBookIdSource.value === bookId ? null : bookId;
    this.selectedBookIdSource.next(nextId);
  }

  isSelectedBook(book: Book): boolean {
    return book.id === this.selectedBookIdSource.value;
  }

  addToFavorites(book: Book) {
    const currentFavorites = this.favoriteBooksSubject.value;
    const isExist = currentFavorites.some((fav) => fav.id === book.id);

    if (isExist) {
      const updatedFavorites = currentFavorites.filter((fav) => fav.id !== book.id);
      this.favoriteBooksSubject.next(updatedFavorites);
    } else {
      this.favoriteBooksSubject.next([...currentFavorites, book]);
    }
  }

  isFavorite(book: Book): boolean {
    return this.favoriteBooksSubject.value.some((fav) => fav.id === book.id);
  }

  deleteBook(book: Book) {
    const currentBooks = this.booksSubject.value;
    const updatedBooks = currentBooks.filter((b) => b.id !== book.id);
    this.booksSubject.next(updatedBooks);

    const currentFavBooks = this.favoriteBooksSubject.value;
    const updatedFavBooks = currentFavBooks.filter((b) => b.id !== book.id);
    this.favoriteBooksSubject.next(updatedFavBooks);
  }
}
