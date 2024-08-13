import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { BookFormComponent } from "../template/book-form/book-form.component";
import { catchError } from 'rxjs';

@Component({
  selector: 'book-edit-form',
  standalone: true,
  imports: [CommonModule, BookFormComponent],
  templateUrl: './book-edit-form.component.html',
  styleUrl: './book-edit-form.component.css'
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
    /*  
      Idéen är att fånga upp om en användare 
      skriver in en ID som inte existerar och
      redirecta tillbaka. Det går säkert att
      hantera i Route eller med en Guard men
      jag kände att det här räckte för vad
      som efterfrågades.
    */
    if (this.bookId != 0) {
      this.bookService.getBookById(this.bookId)
        .pipe(catchError(error => {
          this.router.navigateByUrl("books")
          return []
        }))
        .subscribe(res => {
          if (res) {
            const date = new Date(res.publicationDate).toLocaleDateString("sv-SE")
            this.previousValues = {
              title: [res.title, { nonNullable: true, validators: [Validators.required] }],
              firstName: [res.firstName, { nonNullable: true, validators: [Validators.required] }],
              surName: [res.surName, { nonNullable: true, validators: [Validators.required] }],
              bookType: [res.bookType, { nonNullable: true, validators: [Validators.required] }],
              noOfPages: [res.noOfPages, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }],
              publicationDate: [date, { nonNullable: true, validators: [Validators.required] },]
            }
          }
        })
    }
  }
}
