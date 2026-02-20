import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private libraryService = inject(LibraryService);

  protected readonly branches = ['IT', 'Civil', 'Mechanical'];
  protected saveSuccess = false;
  protected duplicateError = false;

  form = this.fb.group({
    rollNo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(/^[A-Za-z0-9\-]+$/)]],
    name:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern(/^[A-Za-z ]+$/)]],
    branch: ['', [Validators.required]]
  });

  onSubmit(): void {
    this.form.markAllAsTouched();
    this.duplicateError = false;
    if (this.form.invalid) return;

    const rollNo = this.form.value.rollNo!;
    const exists = this.libraryService.students.some(s => s.rollNo === rollNo);
    if (exists) { this.duplicateError = true; return; }

    this.libraryService.addStudent({
      rollNo,
      name: this.form.value.name!,
      branch: this.form.value.branch as 'IT' | 'Civil' | 'Mechanical'
    });

    this.saveSuccess = true;
    this.form.reset();
    setTimeout(() => {
      this.saveSuccess = false;
      this.router.navigate(['/dashboard']);
    }, 1800);
  }
}
