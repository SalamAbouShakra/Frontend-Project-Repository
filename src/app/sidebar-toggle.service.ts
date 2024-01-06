import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {
  private _isCollapsed = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this._isCollapsed.asObservable();

  toggleSidebar() {
    this._isCollapsed.next(!this._isCollapsed.value);
  }


}
