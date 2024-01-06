import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseClaimentryDTO } from '../expense.interface';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-claim-entries',
  templateUrl: './expense-claim-entries.component.html',
  styleUrls: ['./expense-claim-entries.component.css']
})
export class ExpenseClaimEntriesComponent implements OnInit {
  expenseClaimId!: number;
  expenseClaimEntries: ExpenseClaimentryDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    // Extract the expenseClaimId from the route parameters
    console.log('ExpenseClaimEntriesComponent initialized');
    this.route.params.subscribe((params) => {
      this.expenseClaimId = +params['id']; // Convert the id to a number
      this.getExpenseClaimEntries();
    });
  }

  getExpenseClaimEntries(): void {
    // Get all expense claim entries from the service
    this.expenseService.getAllExpenseClaimEntries().subscribe(
      (data) => {
        // Filter entries based on the expenseClaimId
        this.expenseClaimEntries = data.filter(
          (entry) => entry.expenseClaimId === this.expenseClaimId
        );
      },
      (error) => {
        console.error('Error fetching expense claim entries:', error);
      }
    );
  }





}
