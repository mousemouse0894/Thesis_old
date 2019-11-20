import { AppService } from "./services/app.service";
import { AlertService } from "./services/alert.service";
import { Component, OnInit } from "@angular/core";
import { HttpService } from "./services/http.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpService,
    private alert: AlertService,
    public service: AppService
  ) {}

  ngOnInit() {}

  public onLoadingShow = (value: boolean) => {
    document.getElementsByTagName("body")[0].className = value
      ? "modal-open"
      : "";
  };
}
