import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book';

@Pipe({
  name: 'filterBooks',
  pure: true
})
export class FilterBooksPipe implements PipeTransform {

  transform(books: Book[] | null , searchTerm: string): Book[] {
    if(!books){
      return [];
    }
    if(!searchTerm){
      return books;
    }
    const term = searchTerm.toLocaleLowerCase();
    return books.filter(book => book.title.toLocaleLowerCase().includes(term) ||
                                book.author.toLocaleLowerCase().includes(term));
  }

}
