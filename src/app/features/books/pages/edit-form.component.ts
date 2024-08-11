import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormInputComponent } from "../../../shared/components/form-input.component";
import { BookFormComponent } from "../template/book-form/book-form.component";

@Component({
  selector: 'book-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterLink, RouterModule, FormInputComponent, BookFormComponent],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})


export class BookEditFormComponent {
  constructor(private router: Router) {
    this.bookId = Number(this.route.snapshot.params['id']);
  }

  route: ActivatedRoute = inject(ActivatedRoute);
  bookId = 0;

  goBack() {
    this.router.navigate(["/books"], { state: { bookId: this.bookId } })
  }

  bookService = inject(BookService)
  previousValues?: {};


  onSubmit(newValues: {}) {
    const sendObj = { id: this.bookId, ...newValues }
    this.bookService.updateBook(sendObj).subscribe(res =>
      res && this.router.navigate(["books"], { state: { bookId: this.bookId, action: 'update' } })
    )
  }

  ngOnInit() {
    if (this.bookId != 0) {
      this.bookService.getBookById(this.bookId).subscribe(res => {
        if (res) {
          const date = new Date(res.publicationDate).toLocaleDateString("sv-SE")
          this.previousValues = {
            title: [res.title, { nonNullable: true, validators: [Validators.required] }],
            firstName: [res.firstName, { nonNullable: true, validators: [Validators.required] }],
            surName: [res.surName, { nonNullable: true, validators: [Validators.required] }],
            bookType: [res.bookType, { nonNullable: true, validators: [Validators.required] }],
            noOfPages: [res.noOfPages, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }],
            publicationDate: [date, { nonNullable: true }]
          }
        } else {
          this.router.navigateByUrl("books")
        }
      })
    }
  }
}
