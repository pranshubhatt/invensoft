import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibraryService, IssuedBook } from '../../services/library.service';

@Component({
  selector: 'app-return-book',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.scss'
})
export class ReturnBookComponent {
  libraryService = inject(LibraryService);
  returnedRecord: IssuedBook | null = null;

  get activeIssued(): IssuedBook[] {
    return this.libraryService.getActiveIssued();
  }

  returnBook(record: IssuedBook) {
    this.libraryService.returnBook(record.isbn, record.rollNo);
    this.returnedRecord = record;
    setTimeout(() => (this.returnedRecord = null), 3000);
  }
}
