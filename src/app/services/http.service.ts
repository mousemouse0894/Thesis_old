import { Router } from "@angular/router";
import { AlertService } from "./alert.service";
import { LocalstorageService } from "./localstorage.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private rootAPI: string =
    "http://www.cpe.rmuti.ac.th/project/sqlchecking/api/";

  constructor(
    private http: HttpClient,
    private localStorage: LocalstorageService,
    private alert: AlertService,
    private router: Router
  ) {}

  public get = (path: string, queryParms: string = "") => {
    return new Promise(resolve => {
      this.http
        .get(
          `${this.rootAPI}${path}${queryParms.length > 0 ? queryParms : ""}`,
          {
            headers: {
              Authorization:
                this.localStorage.get("userlogin") != null
                  ? this.localStorage.get("userlogin")["token"]
                  : "null"
            }
          }
        )
        .toPromise()
        .then(async (value: any) => {
          if (value.message == "การตรวจสอบเซสชั่นผิดพลาด") {
            let httpResponse = await this.get(
              "login/onLogout",
              `?username=${this.localStorage.get("userlogin")["username"]}`
            );
            this.router.navigate(["/login"]);
            this.localStorage.clear();
            this.alert.alert("warning", "โปรดเข้าสู่ระบบอีกครั้ง");
          } else if (value.message == "เซสชั่นหมดอายุ") {
            this.router.navigate(["/login"]);
            this.localStorage.clear();
            this.alert.alert("warning", "โปรดเข้าสู่ระบบอีกครั้ง");
          }

          resolve({ connect: true, value: value });
        })
        .catch(reason => {
          this.alert.alert("error", "การเชื่อมต่อเซิฟเวอร์ผิดพลาด");
          resolve({ connect: false, value: reason });
        });
    });
  };

  public post = (
    path: string,
    formData: any = null,
    queryParms: string = ""
  ) => {
    return new Promise(resolve => {
      this.http
        .post(
          `${this.rootAPI}${path}${queryParms.length > 0 ? queryParms : ""}`,
          formData,
          {
            headers: {
              Authorization:
                this.localStorage.get("userlogin") != null
                  ? this.localStorage.get("userlogin")["token"]
                  : "null"
            }
          }
        )
        .toPromise()
        .then(async (value: any) => {
          if (value.message == "การตรวจสอบเซสชั่นผิดพลาด") {
            this.router.navigate(["/login"]);
            this.localStorage.clear();
            this.alert.alert("warning", "โปรดเข้าสู่ระบบอีกครั้ง");
          } else if (value.message == "เซสชั่นหมดอายุ") {
            this.router.navigate(["/login"]);
            this.localStorage.clear();
            this.alert.alert("warning", "โปรดเข้าสู่ระบบอีกครั้ง");
          }
          resolve({ connect: true, value: value });
        })
        .catch(reason => {
          this.alert.alert("error", "การเชื่อมต่อเซิฟเวอร์ผิดพลาด");
          resolve({ connect: false, value: reason });
        });
    });
  };
}
