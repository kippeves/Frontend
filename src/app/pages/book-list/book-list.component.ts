import { Component, inject } from '@angular/core';
import { BookItemCompoonent } from '../book-item/book-item.component';
import Book from '../../interfaces/book';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookItemCompoonent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent {
  bookService: BookService = inject(BookService);
  bookList: Book[] = []

  remove(id: number) {
    this.bookService.removeBook(id).subscribe(_ => {
      this.bookList = this.bookList.filter(b => b.id != id)
    })
  }
  constructor() {
    this.bookService.getAllBooks().subscribe(b => {
      this.bookList = b
    })
  }
}
