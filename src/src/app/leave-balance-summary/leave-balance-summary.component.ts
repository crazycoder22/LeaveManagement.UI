import { Component, OnInit } from '@angular/core';
import { LeaveService } from './../leave.service';

@Component({
  selector: 'app-leave-balance-summary',
  templateUrl: './leave-balance-summary.component.html',
  styleUrls: ['./leave-balance-summary.component.css']
})
export class LeaveBalanceSummaryComponent implements OnInit {
  private _leavService: LeaveService;
  public leaveBalances;
  employeeId: string;
  
  constructor(private leavService: LeaveService) {
    this._leavService = leavService;
    this.employeeId = localStorage.getItem("employeeId");
   }

  ngOnInit() {
    this._leavService.getAllLeaveBalances(this.employeeId)
    .subscribe((data: any) => {
      this.leaveBalances = data;
    })
  }

}
