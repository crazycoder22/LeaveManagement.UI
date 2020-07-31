import { LeaveService } from './../leave.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _leavService: LeaveService;
  private leaveBalances;
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
