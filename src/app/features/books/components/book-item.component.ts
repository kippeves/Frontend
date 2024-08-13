import { Component, inject, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faPortrait, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../interfaces/book';

type ColumnData = {
  label: string,
  value: string
};

@Component({
  selector: 'book-list-item',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterOutlet, CommonModule,],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})


export class BookItemCompoonent {
  @Output() onRemoveBook = new EventEmitter<number>();
  @Output() onSelect = new EventEmitter<number>();

  @Input() item!: Book;

  columns?: ColumnData[][]

  update() {
    this.onSelect.emit(this.item.id)
  }

  remove() {
    this.onRemoveBook.emit(this.item.id)
  }

  
  ngOnInit() {
    this.columns = [[{
      label: "Titel",
      value: this.item.title
    }, {
      label: "Författare",
      value: `${this.item.surName}, ${this.item.firstName}`
    },
    {
      label: "Utg.datum",
      value: new Date(this.item.publicationDate).toLocaleDateString("sv-SE")
    }],
    [
      {
        label: "Antal sidor",
        value: this.item.noOfPages.toString()
      },
      {
        label: "Typ av bok",
        value: this.item.bookType

      }
    ]
    ]
  }
  faBook = faBook
  faPortrait = faPortrait
  faTrash = faTrash
  faPencil = faPencil
}
