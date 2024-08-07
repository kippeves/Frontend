import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import Book from '../../interfaces/book';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-entry.component.html',
  styleUrl: './book-entry.component.css'
})

export class BookEntryComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  bookService = inject(BookService)
  book!: Book;
  changedValues?: { [id: string]: object };
  originalValues: any;
  bookTypes = ['Bunden', 'Pocket']
  bookForm?: FormGroup;

  get title() {
    return this.bookForm?.get('title');
  }

  onUpdate() {

    console.debug("fire")
    this.formHasChanged();
  }

  formHasChanged() {
    this.changedValues = {};
    for (const control in this.bookForm?.controls) {
      const field = this.bookForm.get(control);
      if (field?.dirty) {
        var object = JSON.parse(JSON.stringify(this.book))
        if (object[control] != field.value) {
          this.changedValues![control] = field.value
        }
      }
    }
    return this.changedValues;
  }

  constructor() {
    this.bookService.getBookById(this.route.snapshot.params['id']).subscribe(b => {
      if (b) {
        this.book = b;
        this.bookForm = new FormGroup({
          title: new FormControl(b.title, [Validators.required]),
          firstName: new FormControl(b.firstName, [Validators.required]),
          surName: new FormControl(b.surName, [Validators.required]),
          bookType: new FormControl(b.bookType, [Validators.required]),
          noOfPages: new FormControl(b.noOfPages)
        });
      }
    })
  }
}
