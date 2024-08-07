import { inject, Injectable, signal, Signal } from '@angular/core';
import Book from '../interfaces/book';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
const baseAdress = "https://localhost:7278";

@Injectable({
  providedIn: 'root'
})

export class BookService {

  bookList: Book[] = [];
  http = inject(HttpClient);

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${baseAdress}/api/Book/GetAll`)
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${baseAdress}/api/Book/GetBookById?id=${id}`);
  }

  removeBook(id: number) {
    return this.http.delete(`${baseAdress}/api/Book/Delete?id=${id}`)
  }
  updateBook(id: number, data: any) {
    return this.http.put(`${baseAdress}/api/Book/Update/id=${id}`, JSON.stringify(data))
  }
}
