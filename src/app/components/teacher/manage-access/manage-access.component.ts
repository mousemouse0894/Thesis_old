import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";
import { HttpService } from "src/app/services/http.service";
import { FormBuilder } from "@angular/forms";
import { LocalstorageService } from "src/app/services/localstorage.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-manage-access",
  templateUrl: "./manage-access.component.html",
  styleUrls: ["./manage-access.component.scss"]
})
export class ManageAccessComponent implements OnInit {
  public accessStudentrecord: any = null;
  public checkAllselect: boolean = false;
  public p: number = 1;
  constructor(
    private alert: AlertService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    public localStorage: LocalstorageService,
    public service: AppService
  ) {
    this.getAccessStudent();
  }

  ngOnInit() {}

  public getAccessStudent = async () => {
    this.accessStudentrecord = null;
    let httpResponse: any = await this.http.get("token/showstudent");
    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        this.accessStudentrecord = httpResponse.value.data.result;
      } else {
        this.alert.alert("error", httpResponse.value.message);
      }
    }
  };

  public deleteAllSelect = async () => {
    let listCheck: any = null;
    let arrChecked = [];
    await this.accessStudentrecord.forEach(element => {
      listCheck = document.getElementById(`check_${element.username}`);
      if (listCheck.checked == true) {
        arrChecked.push(element.username);
      }
    });
    if (arrChecked.length > 0) {
      this.service.loadingState = true;
      let formData = new FormData();
      formData.append(`username`, arrChecked.join("', '"));
      let httpResponse: any = await this.http.post("token/removeone", formData);
      if (httpResponse.connect) {
        if (httpResponse.value.result == true) {
          this.getAccessStudent();
          this.alert.alert("success", "ลบสำเร็จ");
          this.checkAllselect = false;
        } else {
          this.alert.alert("error", httpResponse.value.message);
        }
      }
      this.service.loadingState = false;
    } else {
      this.alert.alert("warning", "ไม่ได้เลือกผู้ใช้งาน");
    }
  };

  public deleteStudent = () => {
    this.alert.confirmAlert("ยืนยันการลบ").then(async (value: any) => {
      if (value) {
        this.service.loadingState = true;
        let httpResponse: any = await this.http.get("token/removestudent/");
        if (httpResponse.connect) {
          if (httpResponse.value.result == true) {
            this.getAccessStudent();
            this.alert.alert("success", "ลบเซสชั่นสำเร็จ");
          } else {
            this.alert.alert("error", httpResponse.value.message);
          }
        }
      }
    });
  };

  public checkEvent = () => {
    let listCheck: any = null;
    this.accessStudentrecord.forEach(element => {
      listCheck = document.getElementById(`check_${element.username}`);
      listCheck.checked = this.checkAllselect;
    });
  };

  public searchStudent = (array: any, searchString: string) => {
    if (searchString.length > 0) {
      return Array.from(
        new Set([
          ...array.filter(value => value.fname.indexOf(searchString) > -1),
          ...array.filter(value => value.lname.indexOf(searchString) > -1)
        ])
      );
    } else {
      return array;
    }
  };
}
