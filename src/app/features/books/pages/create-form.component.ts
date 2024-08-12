import { Component, inject } from '@angular/core';
import { BookFormComponent } from '../template/book-form/book-form.component';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { Book } from '../interfaces/book';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'book-create-form',
  standalone: true,
  imports: [CommonModule, BookFormComponent],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})

export class BookCreateFormComponent {
  constructor(private router: Router) { }
  bookService = inject(BookService)

  goBack() {
    this.router.navigate(["/books"])
  }

  onSubmit(newBook: Book) {
    this.bookService.addBook(newBook).subscribe(res => {
      res && this.router.navigate(["books"], { state: { bookId: res.id, action: 'add' } })
    })
  }

  previousValues = {}

  ngOnInit() {
    this.previousValues = {
      title: ['', { nonNullable: true, validators: [Validators.required] }],
      firstName: ['', { nonNullable: true, validators: [Validators.required] }],
      surName: ['', { nonNullable: true, validators: [Validators.required] }],
      bookType: ['', { nonNullable: true, validators: [Validators.required] }],
      noOfPages: ['', { nonNullable: true, validators: [Validators.required, Validators.min(1)] }],
      publicationDate: [new Date(), { nonNullable: true }]
    }
  }

}
