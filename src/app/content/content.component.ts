import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.interface';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  // employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // this.employeeService.getAllEmployees().subscribe(employees => {
    //   this.employees = employees;
    // });
  }
  toggleSidebar(): void {
    const body = document.body;
    body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', body.classList.contains('sb-sidenav-toggled').toString());
  }

  // toggleSidebar() {
  //   this.sidebarToggleService.toggleSidebar();
  // }
}


