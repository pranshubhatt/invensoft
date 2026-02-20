import { Routes } from '@angular/router';

import { AddBookComponent }     from './components/add-book/add-book.component';
import { AddStudentComponent }  from './components/add-student/add-student.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { DeleteBookComponent }  from './components/delete-book/delete-book.component';
import { IssueBookComponent }   from './components/issue-book/issue-book.component';
import { LoginComponent }       from './components/login/login.component';
import { ReportComponent }      from './components/report/report.component';
import { ReturnBookComponent }  from './components/return-book/return-book.component';
import { ViewBookComponent }    from './components/view-book/view-book.component';

export const routes: Routes = [
  { path: '',            redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',       component: LoginComponent },
  { path: 'dashboard',   component: DashboardComponent },
  { path: 'add-book',    component: AddBookComponent },
  { path: 'delete-book', component: DeleteBookComponent },
  { path: 'view-book',   component: ViewBookComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'issue-book',  component: IssueBookComponent },
  { path: 'return-book', component: ReturnBookComponent },
  { path: 'report',      component: ReportComponent },
  { path: '**',          redirectTo: 'login' }
];
