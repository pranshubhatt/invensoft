import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  libraryService = inject(LibraryService);

  get totalBooks()    { return this.libraryService.books.length; }
  get totalStudents() { return this.libraryService.students.length; }
  get activeIssued()  { return this.libraryService.getActiveIssued().length; }
  get totalReturned() {
    return this.libraryService.issuedBooks.filter(r => r.returned).length;
  }
  get allIssued()     { return this.libraryService.issuedBooks; }
}
