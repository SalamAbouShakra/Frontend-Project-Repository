import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseClaimDTO, ExpenseClaimentryDTO } from './expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:9090/api/expense-claims';

  // Define your custom headers here
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Add more headers if needed
    }),
  };

  constructor(private http: HttpClient) {}

  getAllExpenseClaims(): Observable<ExpenseClaimDTO[]> {
    return this.http.get<ExpenseClaimDTO[]>(`${this.apiUrl}/all`, { headers: this.httpOptions.headers });
  }

  getAllExpenseClaimEntries(): Observable<ExpenseClaimentryDTO[]> {
    return this.http.get<ExpenseClaimentryDTO[]>(`${this.apiUrl}/entries`, { headers: this.httpOptions.headers });
  }
}



