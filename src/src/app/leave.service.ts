import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
const API_ENDPOINT = "https://localhost:44361/api";

@Injectable({
  providedIn: "root",
})
export class LeaveService {
  constructor(private httpClient: HttpClient) {}

  getEmployeeDetails(email) {
    return this.httpClient.get(
      `${API_ENDPOINT}/Employee?employeeEmailAddress=${email}`
    );
  }

  getAllLeaveRequest(employeeId) {
    return this.httpClient.get(
      `${API_ENDPOINT}/LeaveRequest?employeeid=${employeeId}`
    );
  }

  getAllLeaveBalances(employeeId) {
    return this.httpClient.get(
      `${API_ENDPOINT}/LeaveBalance?employeeid=${employeeId}`
    );
  }
  postLeaveRequest(employeeId, data) {
    return this.httpClient.post(
      `${API_ENDPOINT}/LeaveRequest?employeeid=${employeeId}`,
      data
    );
  }
}
