import { AlertService } from "./../../services/alert.service";
import { HttpService } from "./../../services/http.service";
import { LocalstorageService } from "./../../services/localstorage.service";
import { AppService } from "./../../services/app.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { RecaptchaComponent } from "ng-recaptcha";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @ViewChild("captchaRef", { static: false })
  reCaptcha: RecaptchaComponent;
  public showCapcha: boolean = false;
  public dataCaptcha: string = null;
  public captchaSitekey: string = "6LeNk7sUAAAAAObhJjYiy52ghsMsdWWKmm2u-tA1";

  constructor(
    private route: ActivatedRoute,
    public service: AppService,
    public localStorage: LocalstorageService,
    private http: HttpService,
    private router: Router,
    private alert: AlertService
  ) {
    // this.captchaSitekey = "6Lf-FMMUAAAAAF0TAkoueN8T2sa3m9p20JnDDukr"; // On Server
  }

  public loginSSO = async () => {
    this.service.loadingState = true;
    let sso: any = await this.http.post("login/onSSO");
    if (sso.connect) {
      if (sso.value.result == false && sso.value.message == "ไม่พบเซสชั่น") {
        this.localStorage.clear();
        location.replace(
          "http://www.cpe.rmuti.ac.th/project/sqlchecking/sso/index.php?sso&redirect=http://www.cpe.rmuti.ac.th/project/sqlchecking/login?onSSO=success"
        );
      } else if (
        sso.value.result == true &&
        sso.value.message == "เข้าสู่ระบบสำเร็จ"
      ) {
        this.localStorage.set("userlogin", sso.value.data.result[0]);
        this.router.navigate(["/"]);
        // if (sso.value.data.result[0].password) {
        //   this.alert.alert("success", "เข้าสู่ระบบสำเร็จ");
        // } else {
        //   this.alert.alert(
        //     "warning",
        //     "เข้าสู่ระบบสำเร็จ",
        //     "โปรดเปลี่ยนรหัสผ่านของท่าน"
        //   );
        // }
      } else if (
        sso.value.result == false &&
        sso.value.message == "มีการเข้าใช้งานอยู่"
      ) {
        this.localStorage.clear();
        this.alert.alert(
          "error",
          "บัญชีของท่านกำลังใช้งานอยู่",
          `IP-Address : ${sso.value.data.sub.ipaddress}`
        );
      }
    }

    this.service.loadingState = false;
  };

  ngOnInit() {
    this.captchaSitekey = window.location.hostname.includes("localhost")
      ? "6LeNk7sUAAAAAObhJjYiy52ghsMsdWWKmm2u-tA1"
      : "6Lf-FMMUAAAAAF0TAkoueN8T2sa3m9p20JnDDukr";

    this.showCapcha = true;
    this.route.queryParams.subscribe(async (value: any) => {
      if (value.onSSO == "success") {
        this.service.loadingState = true;
        let sso: any = await this.http.post("login/onSSO");

        if (sso.connect) {
          if (
            sso.value.result == true &&
            sso.value.message == "เข้าสู่ระบบสำเร็จ"
          ) {
            this.localStorage.set("userlogin", sso.value.data.result[0]);
            this.router.navigate(["/"]);
            // if (sso.value.data.result[0].password) {
            //   this.alert.alert("success", "เข้าสู่ระบบสำเร็จ");
            // } else {
            //   this.alert.alert(
            //     "warning",
            //     "เข้าสู่ระบบสำเร็จ",
            //     "โปรดเปลี่ยนรหัสผ่านของท่าน"
            //   );
            // }
          } else if (
            sso.value.result == false &&
            sso.value.message == "มีการเข้าใช้งานอยู่"
          ) {
            this.localStorage.clear();
            this.alert.alert(
              "error",
              "บัญชีของท่านกำลังใช้งานอยู่",
              `IP-Address : ${sso.value.data.sub.ipaddress}`
            );
          }
        }
        this.service.loadingState = false;
      }
    });
  }

  public getYear = () => {
    return new Date().getFullYear();
  };

  public captcha = (data: string) => {
    this.dataCaptcha = data;
  };

  public submitLogin = async (data: NgForm) => {
    this.service.loadingState = true;
    let formData = new FormData();
    Object.keys(data.value).forEach(key => {
      formData.append(`${key}`, data.value[key]);
    });
    let httpResponse: any = await this.http.post("login/onNormal", formData);

    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        this.localStorage.set("userlogin", httpResponse.value.data.result[0]);
        this.router.navigate(["/"]);
        // if (httpResponse.value.data.result[0].password) {
        //   this.alert.alert("success", "เข้าสู่ระบบสำเร็จ");
        // } else {
        //   this.alert.alert(
        //     "warning",
        //     "เข้าสู่ระบบสำเร็จ",
        //     "โปรดเปลี่ยนรหัสผ่านของท่าน"
        //   );
        // }
      } else {
        this.localStorage.clear();
        this.alert.alert("error", httpResponse.value.message);
      }
    }

    this.service.loadingState = false;
  };

  public forgetpass = async (data: NgForm) => {
    this.service.loadingState = true;
    let formData = new FormData();
    Object.keys(data.value).forEach(key => {
      formData.append(`${key}`, data.value[key]);
    });

    if (data.value.password == data.value.password2) {
      let httpResponse: any = await this.http.post("login/forget", formData);
      if (httpResponse.connect) {
        if (httpResponse.value.result == true) {
          this.alert.alert("success", "เปลียนรหัสผ่านสำเร็จ");
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
