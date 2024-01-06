import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { EmployeesComponent } from './employees/employees.component';
import { LeavesComponent } from './leaves/leaves.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseClaimEntriesComponent } from './expense-claim-entries/expense-claim-entries.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main', component: MainLayoutComponent, children: [
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
      { path: 'employees', component: EmployeesComponent },
      { path: 'leaves', component: LeavesComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'expense-claim-entries/:id', component: ExpenseClaimEntriesComponent },
    ]}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
