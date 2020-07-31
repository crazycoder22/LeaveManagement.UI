import { ToastrService } from "ngx-toastr";
import { LeaveService } from "./../leave.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-leave-request",
  templateUrl: "./leave-request.component.html",
  styleUrls: ["./leave-request.component.css"],
})
export class LeaveRequestComponent implements OnInit {
  leaveform;
  _leaveService: LeaveService;
  employeeId: string;
  constructor(
    private leaveService: LeaveService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this._leaveService = leaveService;
    this.employeeId = localStorage.getItem("employeeId")
  }

  ngOnInit(): void {
    this.leaveform = {
      LeaveType: 1,
      From: "2020-01-01",
      FromIsFullDay: "1",
      To: "2020-01-01",
      ToIsFullDay: "1",
      EmployeeComment: "",
    };
  }
  onApply() {
    var obj = { ...this.leaveform };
    obj.FromFullDay = obj.FromIsFullDay == "1" ? true : false;
    obj.ToFullDay = obj.ToIsFullDay == "1" ? true : false;
    obj.LeaveType = parseInt(this.leaveform.LeaveType);
    this._leaveService.postLeaveRequest(this.employeeId, obj).subscribe({next:() => {
      console.log(this.leaveform);
      this.toastr.info("Leave application submitted succesfully.");
      this.router.navigateByUrl("/leavesummary");
    },
    error: (err: any) =>{
      this.toastr.error(err.error);
    }});
  }
}
