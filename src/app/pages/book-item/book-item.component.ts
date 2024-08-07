import { Component, inject, Input } from '@angular/core';
import Book from '../../interfaces/book';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faPortrait, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemCompoonent {
  @Output() onRemoveBook = new EventEmitter<number>();
  @Input() entry!: Book;
  @Input() isLast!: boolean;

  remove(id: number) {
    this.onRemoveBook.emit(id)
  }

  parsedDate!: number;
  ngOnInit() {
    this.parsedDate = new Date(this.entry.publicationDate).getFullYear();
  }
  faBook = faBook
  faPortrait = faPortrait
  faTrash = faTrash
  faPencil = faPencil

}
