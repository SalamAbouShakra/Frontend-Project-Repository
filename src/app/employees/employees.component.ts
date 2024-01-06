import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.interface';
import { DepartmentDTO } from '../department.model';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  departments: DepartmentDTO[] = [];
  isAddEmployeeModalOpen = false;
  isDeleteEmployeeModalOpen = false;
  selectedEmployeeForDelete!: Employee;
  isEditEmployeeModalOpen = false;
  selectedEmployeeForEdit!: Employee;
  searchTerm = '';

  constructor(private employeeService: EmployeeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllDepartments();
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.filteredEmployees = data; // Initialize filteredEmployees with all employees
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  getAllDepartments(): void {
    this.employeeService.getAllDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  getDepartmentName(departmentId: number): string {
    const department = this.departments.find((d) => d.id === departmentId);
    return department ? department.name : '';
  }

  openAddEmployeeModal(): void {
    this.isAddEmployeeModalOpen = true;
  }

  closeAddEmployeeModal(): void {
    this.isAddEmployeeModalOpen = false;
  }

  handleEmployeeAdded(): void {
    console.log('Employee added successfully');
    console.log('Employee added successfully msg displayed another time');
    // Refresh employees data after adding a new employee
    this.getAllEmployees();
    // Manually trigger change detection
    this.cdr.detectChanges();
    console.log('Table should be refreshed now');
  }

  openDeleteEmployeeModal(employee: Employee): void {
    this.selectedEmployeeForDelete = employee;
    this.isDeleteEmployeeModalOpen = true;
  }

  closeDeleteEmployeeModal(): void {
    this.isDeleteEmployeeModalOpen = false;
  }

  confirmDeleteEmployee(): void {
    if (this.selectedEmployeeForDelete) {
      const employeeId = this.selectedEmployeeForDelete.id;
      this.employeeService.deleteEmployee(employeeId).subscribe(() => {
        this.getAllEmployees(); // Refresh employees data after deleting
      });
    }
    this.closeDeleteEmployeeModal();
  }

  openEditEmployeeModal(employee: Employee): void {
    this.selectedEmployeeForEdit = employee;
    this.isEditEmployeeModalOpen = true;
  }

  closeEditEmployeeModal(): void {
    this.isEditEmployeeModalOpen = false;
  }

  confirmEditEmployee(employeeData: Employee): void {
    if (this.selectedEmployeeForEdit) {
      const employeeId = this.selectedEmployeeForEdit.id;
      this.employeeService.patchUpdateEmployee(employeeId, employeeData).subscribe(() => {
        console.log('Employee edited successfully');
        this.getAllEmployees(); // Refresh employees data after updating
        // Manually trigger change detection
        this.cdr.detectChanges();
        console.log('Table should be refreshed now');
        // Close the edit employee modal
        this.closeEditEmployeeModal();
      });
    }
  }

  // Add this method to update the filteredEmployees based on the search term
  updateFilteredEmployees(): void {
    this.filteredEmployees = this.employees.filter((employee) =>
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
