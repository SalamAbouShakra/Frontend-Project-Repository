import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../employee.interface';

@Component({
  selector: 'app-delete-employee-modal',
  templateUrl: './delete-employee-modal.component.html',
  styleUrls: ['./delete-employee-modal.component.css']
})
export class DeleteEmployeeModalComponent {
  @Input() employee!: Employee;
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  confirm(): void {
    this.confirmDelete.emit();
    this.closeModal.emit();
  }

  cancel(): void {
    this.closeModal.emit();
  }



}
