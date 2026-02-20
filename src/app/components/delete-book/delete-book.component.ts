import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.scss'
})
export class DeleteBookComponent {
  private libraryService = inject(LibraryService);

  protected selectedIsbns: Set<string> = new Set();
  protected deleteSuccess = false;

  get books(): Book[] {
    return this.libraryService.books;
  }

  toggleSelect(isbn: string, checked: boolean): void {
    if (checked) {
      this.selectedIsbns.add(isbn);
    } else {
      this.selectedIsbns.delete(isbn);
    }
  }

  toggleAll(checked: boolean): void {
    if (checked) {
      this.libraryService.books.forEach(b => this.selectedIsbns.add(b.isbn));
    } else {
      this.selectedIsbns.clear();
    }
  }

  isAllSelected(): boolean {
    return this.libraryService.books.length > 0 &&
      this.libraryService.books.every(b => this.selectedIsbns.has(b.isbn));
  }

  deleteSelected(): void {
    if (this.selectedIsbns.size === 0) return;
    this.libraryService.deleteBooks(Array.from(this.selectedIsbns));
    this.selectedIsbns.clear();
    this.deleteSuccess = true;
    setTimeout(() => this.deleteSuccess = false, 2500);
  }
}
