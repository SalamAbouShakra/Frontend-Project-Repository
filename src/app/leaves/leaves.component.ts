import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../leave.service';
import { LeaveDTO } from '../leave.interface';
import { ExtendedLeaveDTO } from '../extended-leave.interface';
import {LeavetypeDTO} from "../leavetype.interface";
import {Employee} from "../employee.interface";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
    leaves: ExtendedLeaveDTO[] = [];
    leaveTypeId: number | undefined = undefined;
    employeeId: number | undefined = undefined;
    page: number = 0;
    size: number = 30;
    totalElements: number = 0;

    // Define columns for the ngx-datatable
    columns = [
      { prop: 'id', name: 'ID' },
      { prop: 'leaveTypeName', name: 'Leave Type' },
      { prop: 'leaveFrom', name: 'Leave From' },
      { prop: 'leaveTo', name: 'Leave To' },
      { prop: 'numberOfDays', name: 'Number of Days' },
      { prop: 'note', name: 'Note' },
      { prop: 'employeeName', name: 'Employee Name' },
    ];

    isAddLeaveModalOpen = false;
    leaveTypes: LeavetypeDTO[] = [];
    employees: Employee[] = [];

    constructor(private leaveService: LeaveService) {}

    ngOnInit(): void {
        this.loadLeaveTypesAndEmployees();
        this.getLeaves();
    }

  loadLeaveTypesAndEmployees(): void {
    this.leaveService.getAllLeaveTypes().subscribe(
      (leaveTypes) => {
        this.leaveTypes = leaveTypes;
        this.leaveService.getAllEmployees().subscribe(
          (employees) => {
            this.employees = employees;
          },
          (error) => {
            console.error('Error fetching employees:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching leave types:', error);
      }
    );
  }

  getLeaves(): void {
    // Combine two observables to fetch leave types and employees simultaneously
    forkJoin({
      leaveTypes: this.leaveService.getAllLeaveTypes(),
      employees: this.leaveService.getAllEmployees()
    }).subscribe(
      ({ leaveTypes, employees }) => {
        this.leaveTypes = leaveTypes;
        this.employees = employees;

        // Now that both leave types and employees are available, fetch leaves
        this.leaveService.getLeavesByLeaveTypeAndEmployee(
          this.leaveTypeId ?? 1,
          this.employeeId ?? 3,
          this.page,
          this.size
        ).subscribe(
          (data) => {
            this.leaves = data.content.map((leave: LeaveDTO) => ({
              ...leave,
              leaveTypeName: this.getLeaveTypeName(leave.leaveTypeId),
              employeeName: this.getEmployeeName(leave.employeeId),
            }));
            this.totalElements = data.totalElements;
          },
          (error) => {
            console.error('Error fetching leaves:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching leave types and employees:', error);
      }
    );
  }

  // Helper methods to get leave type and employee names
  private getLeaveTypeName(leaveTypeId: number): string {
    const leaveType = this.leaveTypes.find((lt) => lt.id === leaveTypeId);
    return leaveType ? leaveType.name : '';
  }

  private getEmployeeName(employeeId: number): string {
    const employee = this.employees.find((emp) => emp.id === employeeId);
    return employee ? employee.name : '';
  }

    onPageChange(event: any): void {
        this.page = event.page - 1; // Datatable page starts from 1, but our API uses 0-based pages

        this.getLeaves();
    }

  onSizeChange(): void {
     // Reset page to 0 when the size changes
    this.getLeaves(); // Call the new method when the size changes
  }

    openAddLeaveModal(): void {
        this.isAddLeaveModalOpen = true;
    }

    closeAddLeaveModal(): void {
        this.isAddLeaveModalOpen = false;
    }

    handleLeaveAdded(): void {
        // Refresh leaves data after adding a new leave
        this.getLeaves();
    }

  incrementPage(): void {
    this.page++;
    this.getLeaves();
  }

  decrementPage(): void {
    if (this.page > 0) {
      this.page--;
      this.getLeaves();
    }
  }



}
