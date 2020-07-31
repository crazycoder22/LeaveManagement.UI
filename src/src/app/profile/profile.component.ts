import { Component, OnInit } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { HttpClient } from "@angular/common/http";
import { InteractionRequiredAuthError, AuthError } from "msal";

const GRAPH_ENDPOINT = "https://graph.microsoft.com/v1.0/me";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  profile;

  constructor(private authService: MsalService, private http: HttpClient) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    const requestObj = {
      scopes: ["api://ff712870-7df2-4e17-9d05-e1a5180ef739/test.api"],
    };

    this.authService
      .acquireTokenSilent(requestObj)
      .then(function (tokenResponse) {
        // Callback code here
        console.log(tokenResponse.accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.http.get(GRAPH_ENDPOINT).subscribe({
      next: (profile) => {
        this.profile = profile;
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
                  this.profile = profile;
                });
            });
        }
      },
    });
  }

  getLeaveRequest() {
    const requestObj = {
      scopes: ["api://ff712870-7df2-4e17-9d05-e1a5180ef739/test.api"],
    };

    this.http.get(GRAPH_ENDPOINT).subscribe({
      next: (profile) => {
        this.profile = profile;
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
                  this.profile = profile;
                });
            });
        }
      },
    });
  }
}
