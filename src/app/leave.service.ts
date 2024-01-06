import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from './page.interface';
import { LeaveDTO } from './leave.interface';
import { LeavetypeDTO } from './leavetype.interface';
import { Employee } from './employee.interface';



@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = 'http://localhost:9090/api/leaves';
  private employeeApiUrl = 'http://localhost:9090/api/employees';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

    getLeavesByLeaveTypeAndEmployee(
        leaveTypeId: number,
        employeeId: number,
        page: number,
        size: number
    ): Observable<Page<LeaveDTO>> {
        const params = new HttpParams()
            .set('leaveTypeId', leaveTypeId.toString())
            .set('employeeId', employeeId.toString())
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.get<Page<LeaveDTO>>(
            `${this.apiUrl}/leavesByLeaveTypeAndEmployee`,
            { headers: this.httpOptions.headers, params }
        );
    }

    submitLeave(leave: LeaveDTO): Observable<LeaveDTO> {
        return this.http.post<LeaveDTO>(`${this.apiUrl}/submitLeave`, leave, this.httpOptions);
    }

    getAllLeaveTypes(): Observable<LeavetypeDTO[]> {
        return this.http.get<LeavetypeDTO[]>(`${this.apiUrl}/leaveTypes`, this.httpOptions);
    }

    getAllEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.employeeApiUrl}`, this.httpOptions);
    }


}
