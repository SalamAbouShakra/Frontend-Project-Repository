import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { EmployeesComponent } from './employees/employees.component';
import { LeavesComponent } from './leaves/leaves.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddEmployeeModalComponent } from './add-employee-modal/add-employee-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeleteEmployeeModalComponent } from './delete-employee-modal/delete-employee-modal.component';
import { AddLeaveModalComponent } from './add-leave-modal/add-leave-modal.component';
import { ExpenseClaimEntriesComponent } from './expense-claim-entries/expense-claim-entries.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SidebarComponent,
    ContentComponent,
    EmployeesComponent,
    LeavesComponent,
    ExpensesComponent,
    AddEmployeeModalComponent,
    DeleteEmployeeModalComponent,
    AddLeaveModalComponent,
    ExpenseClaimEntriesComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule,
    NgxDatatableModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
