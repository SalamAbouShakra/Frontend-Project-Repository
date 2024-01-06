// extended-leave.interface.ts
import { LeaveDTO } from './leave.interface';

export interface ExtendedLeaveDTO extends LeaveDTO {
  leaveTypeName: string;
  employeeName: string;
}
