import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  // Function to toggle the sidebar
  toggleSidebar(): void {
    const body = document.body;
    body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', body.classList.contains('sb-sidenav-toggled').toString());
  }
}
