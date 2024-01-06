// leave.interface.ts

export interface LeaveDTO {
  id: number;
  leaveTypeId: number;
  leaveFrom: Date;
  leaveTo: Date;
  numberOfDays: number;
  note: string;
  employeeId: number;
}
