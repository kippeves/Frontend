import { Component, inject } from '@angular/core';
import { BookItemCompoonent } from '../components/book-item.component';
import { Book } from '../interfaces/book';
import { CommonModule } from '@angular/common';
import { BookService } from '../book.service';
import { BookEditFormComponent } from './book-edit-form.component';
import { ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookItemCompoonent, BookEditFormComponent, RouterModule],
  templateUrl: './book-list.component.html',
})

export class BookListComponent {
  authService = inject(AuthService)
  bookService: BookService = inject(BookService);
  cache = localStorage.getItem("cache")
  Books: Book[] = this.cache ? JSON.parse(this.cache) : []

  onUpdate(newState: Book) {
    this.scrollToItem(newState.id)
    this.confirmOnChange(newState.id)
  }

  confirmOnChange(id: number) {
    const elem = document.getElementById("book" + id)?.getElementsByTagName("button")[0];
    elem?.classList.replace('btn-secondary', 'btn-success')
    setTimeout(() => {
      elem?.classList.replace('btn-success', 'btn-secondary')
    }, 750)
  }

  scrollToItem(id: number) {
    const elem = document.getElementById("book" + id);
    elem?.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' })
  }

  remove(id: number) {
    if (window.confirm("Är du säker på att du vill ta bort boken?")) {
      this.bookService.removeBook(id).subscribe(_ =>
        this.Books = this.Books.filter(b => b.id != id)
      )
      const closestId = this.Books.find(o => o.id > id);
      if (closestId) {
        this.scrollToItem(closestId.id)
      }
    }
  }

  constructor(private ref: ChangeDetectorRef, private router: Router) {
    if (this.authService.getLoggedInSignal()) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as { bookId: number, action: string } | undefined;
      this.bookService.getAllBooks().subscribe(data => {
        this.Books = data
        localStorage.setItem("cache", JSON.stringify(data));
        if (state) {
          ref.detectChanges();
          this.scrollToItem(state.bookId)
          switch (state.action) {
            case 'update':
              this.confirmOnChange(state.bookId)
          }
        }
      })
    }
  }
  ngOnDestroy() {
    localStorage.removeItem("cache");
  }
}
