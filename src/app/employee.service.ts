import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.interface';
import { DepartmentDTO } from './department.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:9090/api/employees'; // Replace with your actual API endpoint
  private departmentsUrl = 'http://localhost:9090/api/departments/all';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl, this.httpOptions);
  }

  addEmployee(employee: Employee): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/addemp`, employee);
  }

  deleteEmployee(employeeId: number): Observable<void> {
    // Assuming your Spring Boot API endpoint for deleting employees is '/api/employees/{employeeId}'
    const deleteEmployeeUrl = `${this.apiUrl}/${employeeId}`;
    return this.http.delete<void>(deleteEmployeeUrl);
  }

  patchUpdateEmployee(employeeId: number, employeeData: Partial<Employee>): Observable<void> {
    // Assuming your Spring Boot API endpoint for patch updating employees is '/api/employees/update/{employeeId}'
    const patchUpdateEmployeeUrl = `${this.apiUrl}/update/${employeeId}`;

    // Construct a new Employee object with only the properties to be updated
    const updatedEmployee: Employee = {
      id: employeeId, // Make sure to include the employee ID
      name: employeeData.name!, // Non-null assertion
      email: employeeData.email!, // Non-null assertion
      address: employeeData.address!, // Non-null assertion
      departmentId: Number(employeeData.departmentId!), // Non-null assertion
    };

    console.log('Data sent to API:', updatedEmployee);

    return this.http.patch<void>(patchUpdateEmployeeUrl, updatedEmployee, this.httpOptions);
  }

  getAllDepartments(): Observable<DepartmentDTO[]> {
    return this.http.get<DepartmentDTO[]>(this.departmentsUrl, this.httpOptions);
  }

}
