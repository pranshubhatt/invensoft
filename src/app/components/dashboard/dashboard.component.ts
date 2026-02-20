import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';
import { LibraryService, IssuedBook } from '../../services/library.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('barChart') private barChartRef?: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') private pieChartRef?: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];
  private libraryService = inject(LibraryService);

  get issuedBooks(): IssuedBook[] {
    return this.libraryService.issuedBooks;
  }

  get totalBooks(): number { return this.libraryService.books.length; }
  get totalStudents(): number { return this.libraryService.students.length; }
  get activeIssued(): number { return this.libraryService.getActiveIssued().length; }
  get returned(): number { return this.libraryService.issuedBooks.filter(i => i.returned).length; }

  private readonly labels = ['Person 1', 'Person 2', 'Person 3', 'Person 4', 'Person 5'];
  private readonly barData = [5, 8, 12, 7, 4];
  private readonly pieData = [14, 22, 33, 20, 11];
  private readonly palette = ['#4472C4', '#2F5597', '#5B9BD5', '#A5A5A5', '#70AD47'];

  ngAfterViewInit(): void {
    if (this.barChartRef) {
      this.charts.push(new Chart(this.barChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [{ label: 'No. Of Books', data: this.barData, backgroundColor: this.palette }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true, ticks: { stepSize: 2 } } } }
      }));
    }
    if (this.pieChartRef) {
      this.charts.push(new Chart(this.pieChartRef.nativeElement, {
        type: 'pie',
        data: {
          labels: this.labels,
          datasets: [{ label: 'No. Of Books', data: this.pieData, backgroundColor: this.palette }]
        },
        options: { responsive: true }
      }));
    }
  }

  ngOnDestroy(): void {
    this.charts.forEach(c => c.destroy());
  }
}

