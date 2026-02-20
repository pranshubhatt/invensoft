import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Student } from '../models/student.model';

export interface IssuedBook {
  isbn: string;
  bookName: string;
  author: string;
  rollNo: string;
  studentName: string;
  issuedOn: string;
  returned: boolean;
}

@Injectable({ providedIn: 'root' })
export class LibraryService {

  books: Book[] = [
    { isbn: '9780132350884', name: 'Clean Code', author: 'Robert C Martin', publication: 'Prentice Hall', details: 'Readable maintainable software practices', qty: 10, price: 520, branch: 'IT' },
    { isbn: '9781491950296', name: 'Data Intensive Applications', author: 'Martin Kleppmann', publication: 'OReilly Media', details: 'Distributed systems and data storage', qty: 5, price: 750, branch: 'IT' },
    { isbn: '9780134494166', name: 'Fluid Mechanics', author: 'Frank White', publication: 'McGraw Hill', details: 'Fluid dynamics and hydraulics principles', qty: 8, price: 610, branch: 'Mechanical' },
    { isbn: '9780131103627', name: 'Concrete Technology', author: 'MS Shetty', publication: 'S Chand', details: 'Material properties and design basics', qty: 7, price: 430, branch: 'Civil' },
    { isbn: '9780262033848', name: 'Introduction to Algorithms', author: 'Thomas Cormen', publication: 'MIT Press', details: 'Algorithms and computational complexity', qty: 6, price: 890, branch: 'IT' },
  ];

  students: Student[] = [
    { rollNo: 'IT-101', name: 'Asha Rao', branch: 'IT' },
    { rollNo: 'IT-102', name: 'Rahul Mehta', branch: 'IT' },
    { rollNo: 'ME-203', name: 'Vikram Singh', branch: 'Mechanical' },
    { rollNo: 'CE-312', name: 'Neha Sharma', branch: 'Civil' },
    { rollNo: 'ME-210', name: 'Ankit Joshi', branch: 'Mechanical' },
  ];

  issuedBooks: IssuedBook[] = [
    { isbn: '9780132350884', bookName: 'Clean Code', author: 'Robert C Martin', rollNo: 'IT-101', studentName: 'Asha Rao', issuedOn: '2026-02-01', returned: false },
    { isbn: '9780262033848', bookName: 'Introduction to Algorithms', author: 'Thomas Cormen', rollNo: 'ME-203', studentName: 'Vikram Singh', issuedOn: '2026-02-08', returned: false },
    { isbn: '9780131103627', bookName: 'Concrete Technology', author: 'MS Shetty', rollNo: 'CE-312', studentName: 'Neha Sharma', issuedOn: '2026-02-12', returned: true },
  ];

  addBook(book: Book): void {
    this.books.push(book);
  }

  deleteBooks(isbns: string[]): void {
    this.books = this.books.filter(b => !isbns.includes(b.isbn));
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  issueBook(record: IssuedBook): void {
    this.issuedBooks.push(record);
  }

  returnBook(isbn: string, rollNo: string): void {
    const record = this.issuedBooks.find(
      i => i.isbn === isbn && i.rollNo === rollNo && !i.returned
    );
    if (record) {
      record.returned = true;
    }
  }

  getActiveIssued(): IssuedBook[] {
    return this.issuedBooks.filter(i => !i.returned);
  }
}
