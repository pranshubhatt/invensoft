import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private libraryService = inject(LibraryService);

  protected readonly branches = ['IT', 'Civil', 'Mechanical'];
  protected saveSuccess = false;
  protected duplicateError = false;

  form = this.fb.group({
    isbn:        ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^\d+$/)]],
    name:        ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
    author:      ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
    publication: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
    details:     ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250), Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
    qty:         [null as number | null, [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern(/^\d+$/)]],
    price:       [null as number | null, [Validators.required, Validators.min(5), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    branch:      ['', [Validators.required]]
  });

  onSubmit(): void {
    this.form.markAllAsTouched();
    this.duplicateError = false;
    if (this.form.invalid) return;

    const isbn = this.form.value.isbn!;
    const exists = this.libraryService.books.some(b => b.isbn === isbn);
    if (exists) {
      this.duplicateError = true;
      return;
    }

    this.libraryService.addBook({
      isbn,
      name:        this.form.value.name!,
      author:      this.form.value.author!,
      publication: this.form.value.publication!,
      details:     this.form.value.details!,
      qty:         Number(this.form.value.qty),
      price:       Number(this.form.value.price),
      branch:      this.form.value.branch as 'IT' | 'Civil' | 'Mechanical'
    });

    this.saveSuccess = true;
    this.form.reset();
    setTimeout(() => {
      this.saveSuccess = false;
      this.router.navigate(['/view-book']);
    }, 1800);
  }
}
