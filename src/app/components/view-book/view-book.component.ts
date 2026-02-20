import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.scss'
})
export class ViewBookComponent {
  private libraryService = inject(LibraryService);

  get books(): Book[] {
    return this.libraryService.books;
  }
}
