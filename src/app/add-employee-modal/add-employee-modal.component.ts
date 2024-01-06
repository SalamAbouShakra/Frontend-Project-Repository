import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../employee.interface';
import { EmployeeService } from '../employee.service';
import { DepartmentDTO } from '../department.model';


@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.css']
})
export class AddEmployeeModalComponent implements OnChanges {
  @Input() employee!: Employee;
  @Output() employeeAdded = new EventEmitter<Employee>();
  @Output() closeModal = new EventEmitter<void>();
  departments: DepartmentDTO[] = [];


  constructor(private employeeService: EmployeeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Triggered when the employee input changes (i.e., for editing)

  }

  ngOnInit(): void {
    // Fetch departments when the component initializes
    this.employeeService.getAllDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  addEmployee(form: NgForm): void {
    if (form.valid) {
      if (this.employee) {
        // If editing an existing employee
        this.employeeService.patchUpdateEmployee(this.employee.id, form.value).subscribe(
          () => {
            console.log('Employee edited successfully');
            this.employeeAdded.emit(form.value);
            this.closeModal.emit();
          },
          (error) => {
            console.error('Error editing employee:', error);
          }
        );
      } else {
        // If adding a new employee
        this.employeeService.addEmployee(form.value).subscribe(
          () => {
            console.log('Employee added successfully');
            this.employeeAdded.emit(form.value);
            this.closeModal.emit();
          },
          (error) => {
            console.error('Error adding employee:', error);
          }
        );
      }
    }
  }

  cancel(): void {
    this.closeModal.emit();
  }
}

