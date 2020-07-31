import { LeaveService } from "./leave.service";
import { Component, OnInit } from "@angular/core";
import { BroadcastService, MsalService } from "@azure/msal-angular";
import { HttpClient } from "@angular/common/http";
import { Logger, CryptoUtils } from "msal";
import { InteractionRequiredAuthError, AuthError } from "msal";
const GRAPH_ENDPOINT = "https://graph.microsoft.com/v1.0/me";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Employee Services";
  isIframe = false;
  loggedIn = false;
  profile;
  employeeDetails;
  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService,
    private http: HttpClient,
    private leaveService: LeaveService
  ) {}

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.checkAccount();

    if (this.loggedIn) {
      this.getProfile();
    }

    this.broadcastService.subscribe("msal:loginSuccess", () => {
      this.checkAccount();
    });

    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error("Redirect Error: ", authError.errorMessage);
        return;
      }

      console.log("Redirect Success: ", response.accessToken);
    });

    this.authService.setLogger(
      new Logger(
        (logLevel, message, piiEnabled) => {
          console.log("MSAL Logging: ", message);
        },
        {
          correlationId: CryptoUtils.createNewGuid(),
          piiLoggingEnabled: false,
        }
      )
    );
  }

  checkAccount() {
    this.loggedIn = !!this.authService.getAccount();
  }

  login() {
    const isIE =
      window.navigator.userAgent.indexOf("MSIE ") > -1 ||
      window.navigator.userAgent.indexOf("Trident/") > -1;

    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
  }
  getProfile() {
    return this.http.get(GRAPH_ENDPOINT).subscribe({
      next: (profile: any) => {
        this.profile = profile;
        this.leaveService
          .getEmployeeDetails(profile.mail)
          .subscribe((data: any) => {
            this.employeeDetails = data;
            localStorage.setItem("employeeId", this.employeeDetails.EmployeeId);
          });
      },
      error: (err: AuthError) => {
        // If there is an interaction required error,
        // call one of the interactive methods and then make the request again.
        if (
          InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)
        ) {
          this.authService
            .acquireTokenPopup({
              scopes: this.authService.getScopesForEndpoint(GRAPH_ENDPOINT),
            })
            .then(() => {
              this.http
                .get(GRAPH_ENDPOINT)
                .toPromise()
                .then((profile) => {
                  console.log(profile);
                  this.profile = profile;
                });
            });
        }
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
