import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-issue-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './issue-book.component.html',
  styleUrl: './issue-book.component.scss'
})
export class IssueBookComponent {
  private fb = inject(FormBuilder);
  libraryService = inject(LibraryService);
  private router = inject(Router);

  saveSuccess = false;
  alreadyIssued = false;

  form = this.fb.group({
    isbn:        ['', Validators.required],
    rollNo:      ['', Validators.required],
    issuedOn:    [new Date().toISOString().slice(0, 10), Validators.required]
  });

  get selectedBook() {
    const isbn = this.form.controls.isbn.value;
    return this.libraryService.books.find(b => b.isbn === isbn);
  }

  get selectedStudent() {
    const rollNo = this.form.controls.rollNo.value;
    return this.libraryService.students.find(s => s.rollNo === rollNo);
  }

  onSubmit() {
    this.form.markAllAsTouched();
    this.alreadyIssued = false;
    if (this.form.invalid) return;

    const book    = this.selectedBook;
    const student = this.selectedStudent;
    if (!book || !student) return;

    const isbn   = this.form.controls.isbn.value!;
    const rollNo = this.form.controls.rollNo.value!;

    const exists = this.libraryService.getActiveIssued().some(
      r => r.isbn === isbn && r.rollNo === rollNo
    );
    if (exists) { this.alreadyIssued = true; return; }

    this.libraryService.issueBook({
      isbn,
      bookName:    book.name,
      author:      book.author,
      rollNo,
      studentName: student.name,
      issuedOn:    this.form.controls.issuedOn.value!,
      returned:    false
    });

    this.saveSuccess = true;
    setTimeout(() => this.router.navigateByUrl('/dashboard'), 1800);
  }
}
