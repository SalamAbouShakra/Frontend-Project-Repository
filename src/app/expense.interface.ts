// expense.interface.ts

export interface ExpenseClaimDTO {
  id: number;
  date: Date;
  description: string;
  total: number;
  status: string;
  employeeId: number;

}

export interface ExpenseClaimentryDTO {
  id: number;
  date: Date;
  expenseTypeId: number;
  expenseClaimId: number;
  description: string;
  total: number;
}
