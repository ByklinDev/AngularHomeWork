import { Component } from '@angular/core';
import { BooksContent } from '../../book/books-content/books-content';

@Component({
  selector: 'app-main-content-panel',
  imports: [BooksContent],
  templateUrl: './main-content-panel.html',
  styleUrl: './main-content-panel.scss',
})
export class MainContentPanel {}
