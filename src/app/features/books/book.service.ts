import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { Book } from './interfaces/book';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private api = inject(ApiService)

  addBook(data: any) {
    return this.api.post<Book | undefined>({ url: 'Book/Add', data: data, headers: { 'Content-Type': 'application/json; charset=utf-8' } })
  }

  getAllBooks() {
    return this.api.get<Book[]>({ url: 'Book/GetAll' });
  }

  getBookById(id: number) {
    return this.api.get<Book | undefined>({ url: 'Book/GetBookById', params: { id: id } });
  }

  removeBook(id: number) {
    return this.api.delete({ url: 'Book/Delete', params: { id: id } });
  }

  updateBook(data: any) {
    return this.api.put({ url: 'Book/Update', data: data, headers: { 'Content-Type': 'application/json; charset=utf-8' } })
  }
}
