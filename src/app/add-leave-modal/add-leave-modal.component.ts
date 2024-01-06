import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LeaveService } from '../leave.service';
import { LeaveDTO } from '../leave.interface';
import { LeavetypeDTO } from '../leavetype.interface';
import { Employee } from '../employee.interface';

@Component({
  selector: 'app-add-leave-modal',
  templateUrl: './add-leave-modal.component.html',
  styleUrls: ['./add-leave-modal.component.css']
})
export class AddLeaveModalComponent implements OnInit {
  @Output() leaveAdded = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  leave: LeaveDTO = {
    id: 0,
    leaveTypeId: 0,
    leaveFrom: new Date(),
    leaveTo: new Date(),
    numberOfDays: 0,
    note: '',
    employeeId: 0
  };
  leaveTypes: LeavetypeDTO[] = []; // Assuming you have a LeavetypeDTO interface
  employees: Employee[] = []; // Assuming you have an EmployeeDTO interface

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.loadLeaveTypes();
    this.loadEmployees();
  }

  loadLeaveTypes(): void {
    this.leaveService.getAllLeaveTypes().subscribe(
        (data) => {
          this.leaveTypes = data;
        },
        (error) => {
          console.error('Error fetching leave types:', error);
        }
    );
  }

  loadEmployees(): void {
    this.leaveService.getAllEmployees().subscribe(
        (data) => {
          this.employees = data;
        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
    );
  }

  addLeave(form: NgForm): void {
    if (form.valid) {
      this.leaveService.submitLeave(this.leave).subscribe(
          () => {
            console.log('Leave added successfully');
            this.leaveAdded.emit();
            this.closeModal.emit();
          },
          (error) => {
            console.error('Error adding leave:', error);
          }
      );
    }
  }

  cancel(): void {
    this.closeModal.emit(); // Emit the closeModal event
  }




}
