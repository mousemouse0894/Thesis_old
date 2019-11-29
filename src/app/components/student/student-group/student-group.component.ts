import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";
import { HttpService } from "src/app/services/http.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LocalstorageService } from "src/app/services/localstorage.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-student-group",
  templateUrl: "./student-group.component.html",
  styleUrls: ["./student-group.component.scss"]
})
export class StudentGroupComponent implements OnInit {
  public studentgroupresult: any = null;
  public teachergroupresult: any = null;
  public pagiStudentGroup: number = 1;
  public messageGroup: any = null;
  public formGroup: FormGroup;
  public IdGroupForm: any = null;
  public nameGroupForm: any = null;
  public groupOwnerFrom: any = null;
  public nameOwnerFrom: any = null;
  public _windows: any = window;
  public orderByGroup = {
    order: "asc",
    key: "gName"
  };

  constructor(
    private alert: AlertService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    public localStorage: LocalstorageService,
    public service: AppService
  ) {
    this.selectStudentGroup();
  }

  ngOnInit() {}

  public searchGroup = (array: any, searchString: string) => {
    if (searchString.length > 0) {
      return Array.from(
        new Set([
          ...array.filter(value => value.gName.indexOf(searchString) > -1),
          ...array.filter(value => value.fname.indexOf(searchString) > -1),
          ...array.filter(value => value.lname.indexOf(searchString) > -1)
        ])
      );
    } else {
      return array;
    }
  };

  public selectStudentGroup = async () => {
    let httpResponse: any = await this.http.get(
      "group/showstgroup/" + this.localStorage.get("userlogin")["username"]
    );
    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        this.studentgroupresult = httpResponse.value.data.result;
        this.groupOrder(this.orderByGroup.order, this.orderByGroup.key);

        this.messageGroup = httpResponse.value.message;
      } else {
        this.alert.alert("error", httpResponse.value.message);
      }
    }
  };

  public enterStudentGroup = (
    gId: any,
    gName: any,
    owner: any,
    prename: any,
    fname: any,
    lname: any
  ) => {
    this.IdGroupForm = gId;
    this.nameGroupForm = gName;
    this.groupOwnerFrom = owner;
    this.nameOwnerFrom = prename + fname + " " + lname;
  };
  public enterPasswordGroup = async PasswordGroup => {
    this.formGroup = this.formBuilder.group({
      username: [this.localStorage.get("userlogin")["username"]],
      gId: [this.IdGroupForm, Validators.required],
      password: [PasswordGroup, Validators.required]
    });
    this.service.loadingState = true;
    let formData = new FormData();
    Object.keys(this.formGroup.value).forEach(key => {
      formData.append(`${key}`, this.formGroup.value[key]);
    });
    let httpResponse: any = await this.http.post(
      "group/submitstudent",
      formData
    );
    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        if (httpResponse.value.message == "เข้ากลุ่มสำเร็จ") {
          this.alert.alert("success", httpResponse.value.message);
          this._windows.$("#enterPasswordGroup").modal("hide");
          this.IdGroupForm = null;
          this.nameGroupForm = null;
          this.groupOwnerFrom = null;
          this.studentgroupresult = null;
          this.selectStudentGroup();
        } else {
          this.alert.alert("error", httpResponse.value.message);
        }
      } else {
        this.alert.alert("error", httpResponse.value.message);
      }
    }

    this.service.loadingState = false;
  };

  public groupOrder = (order: string, key: string) => {
    this.orderByGroup = {
      order: order,
      key: key
    };
  };

  public sortArray = (arr2: Array<any>, order: string, key: string) => {
    let n = arr2.length;
    for (let i = 1; i < n; ++i) {
      let keysort = arr2[i][key];
      let keysort2 = arr2[i];
      let j = i - 1;
      while (
        j >= 0 &&
        arr2[j][key].localeCompare(keysort) == (order == "desc" ? -1 : 1)
      ) {
        arr2[j + 1] = arr2[j];
        j = j - 1;
      }
      arr2[j + 1] = keysort2;
    }
    return arr2;
  };
}
