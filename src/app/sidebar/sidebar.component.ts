import { Component, OnInit } from '@angular/core';
import { SidebarToggleService } from '../sidebar-toggle.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;

  constructor(private sidebarToggleService: SidebarToggleService) { }

  ngOnInit(): void {
    this.sidebarToggleService.isCollapsed$.subscribe((isCollapsed) => {
      this.isCollapsed = isCollapsed;
    });
  }
}
