import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { ExpenseClaimDTO } from '../expense.interface';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expenseClaims: ExpenseClaimDTO[] = [];
  pageSize: number = 2; // set your desired page size
  currentPage: number = 2; // set your desired initial page
  totalElements: number = 0;

  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'date', name: 'Date' },
    { prop: 'description', name: 'Description' },
    { prop: 'total', name: 'Total' },
    { prop: 'status', name: 'Status' },
    { prop: 'employeeId', name: 'Employee ID' },
  ];

  constructor(
    private expenseService: ExpenseService,
    private router: Router // Inject the Router
  ) {}

  ngOnInit(): void {
    this.getExpenseClaims();
  }

  getExpenseClaims(): void {
    this.expenseService.getAllExpenseClaims().subscribe(
      (data) => {
        console.log('Expense claims data:', data);
        this.expenseClaims = data;
        this.totalElements = data.length; // Assuming totalElements is the array length
      },
      (error) => {
        console.error('Error fetching expense claims:', error);
      }
    );
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
  }

  getDisplayedClaims(): ExpenseClaimDTO[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.expenseClaims.slice(startIndex, startIndex + this.pageSize);
  }

  viewExpenseClaimEntries(expenseClaimId: number): void {
    // Navigate to the ExpenseClaimEntriesComponent with the expense claim id
    console.log('Viewing entries for Expense Claim ID:', expenseClaimId);
    this.router.navigate(['expense-claim-entries', expenseClaimId]);
  }

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.pageSize);
  }

  decrementPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getExpenseClaims();
    }
  }

  incrementPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getExpenseClaims();
    }
  }



}
