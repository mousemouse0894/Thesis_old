import { AlertService } from "./../../services/alert.service";
import { HttpService } from "./../../services/http.service";
import { LocalstorageService } from "./../../services/localstorage.service";
import { AppService } from "./../../services/app.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { RecaptchaComponent } from "ng-recaptcha";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public service: AppService,
    public localStorage: LocalstorageService,
    private http: HttpService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit() {}

  public submitChangPass = async (data: NgForm) => {
    this.service.loadingState = true;
    data.value.username = this.localStorage.get("userlogin")["username"];
    let formData = new FormData();
    Object.keys(data.value).forEach(key => {
      formData.append(`${key}`, data.value[key]);
    });
    if (data.value.password == data.value.password2) {
      let httpResponse: any = await this.http.post("password/update", formData);

      if (httpResponse.connect) {
        if (httpResponse.value.result == true) {
          let changepass = this.localStorage.get("userlogin");
          this.alert.alert("success", "เปลี่ยนรหัสผ่านสำเร็จ");
          changepass["password"] = true;
          this.localStorage.set("userlogin", changepass);
        } else {
          this.localStorage.clear();
          this.alert.alert("error", httpResponse.value.message);
        }
      }
    } else {
      this.alert.alert("error", "รหัสผ่านไม่ตรงกัน");
    }
    this.service.loadingState = false;
  };
}
