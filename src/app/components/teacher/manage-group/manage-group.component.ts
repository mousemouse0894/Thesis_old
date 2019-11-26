import { AppService } from "./../../../services/app.service";
import { LocalstorageService } from "./../../../services/localstorage.service";
import { HttpService } from "./../../../services/http.service";
import { AlertService } from "./../../../services/alert.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-manage-group",
  templateUrl: "./manage-group.component.html",
  styleUrls: ["./manage-group.component.scss"]
})
export class ManageGroupComponent implements OnInit {
  public formGroup: FormGroup;
  public groupresult: any = null;
  public studentInGroup: any = null;
  public p: number = 1;
  public pagiShowStudent: number = 1;
  public _windows: any = window;
  public selectStudentgroup: any = null;
  public orderByGroup = {
    order: "asc",
    key: "gName"
  };
  public orderByStudent = {
    order: "asc",
    key: "studentId"
  };
  constructor(
    private alert: AlertService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    public localStorage: LocalstorageService,
    public service: AppService
  ) {
    this.selectGroup();
  }

  ngOnInit() {}

  public searchGroup = (array: any, searchString: string) => {
    if (searchString.length > 0) {
      return [
        ...array.filter(value => value.gName.indexOf(searchString) > -1),
        ...array.filter(value => value.gStatus == searchString)
      ];
    } else {
      return array;
    }
  };

  public searchStudent = (array: any, searchString: string) => {
    if (searchString.length > 0) {
      return [
        ...array.filter(value => value.studentId.indexOf(searchString) > -1),
        ...array.filter(value => value.fname.indexOf(searchString) > -1)
      ];
    } else {
      return array;
    }
  };

  public deleteStudent = (username: String) => {
    this.alert.confirmAlert("ยืนยันการลบ").then(async (value: any) => {
      if (value) {
        this.service.loadingState = true;
        let httpResponse: any = await this.http.get(
          "group/removestudent/" + username
        );
        if (httpResponse.connect) {
          if (httpResponse.value.result == true) {
            this.selectStudent(this.selectStudentgroup);
            this.alert.alert("success", "ลบข้อมูลสำเร็จ");
          } else {
            this.alert.alert("error", httpResponse.value.message);
          }
        }
      }
      this.service.loadingState = false;
    });
  };

  public openCreateGroup = () => {
    this.formGroup = this.formBuilder.group({
      name: ["", Validators.required],
      owner: [this.localStorage.get("userlogin")["username"]],
      password: ["", Validators.required],
      status: ["เปิด", Validators.required]
    });
  };

  public openEditGroup = (
    name: string,
    password: string,
    status: string,
    gId: number
  ) => {
    this.formGroup = this.formBuilder.group({
      name: [name, Validators.required],
      owner: [this.localStorage.get("userlogin")["username"]],
      password: [password, Validators.required],
      status: [status, Validators.required],
      gId: [gId, Validators.required]
    });
  };

  public submitCreateGroup = async () => {
    // console.log(this.formGroup.value);
    this.service.loadingState = true;
    let formData = new FormData();
    Object.keys(this.formGroup.value).forEach(key => {
      formData.append(`${key}`, this.formGroup.value[key]);
      // console.log(`${key}`, this.formGroup.value[key]);
    });
    let httpResponse: any = await this.http.post("group/creategroup", formData);
    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        this.selectGroup();
        this._windows.$("#createGroup").modal("hide");
        this.alert.alert("success", "เพื่มกลุ่มสำเร็จ");
      } else {
        this.alert.alert("error", httpResponse.value.message);
      }
    }

    this.service.loadingState = false;
  };

  public submitEditGroup = async () => {
    this.service.loadingState = true;
    let formData = new FormData();
    Object.keys(this.formGroup.value).forEach(key => {
      formData.append(`${key}`, this.formGroup.value[key]);
      // console.log(`${key}`, this.formGroup.value[key]);
    });
    let httpResponse: any = await this.http.post("group/groupupdate", formData);
    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        this.selectGroup();
        this._windows.$("#editGroup").modal("hide");
        this.alert.alert("success", "เเก้ไขสำเร็จ");
      } else {
        this.alert.alert("error", httpResponse.value.message);
      }
    }

    this.service.loadingState = false;
  };

  public selectGroup = async () => {
    this.groupresult = null;
    let httpResponse: any = await this.http.get(
      "group/showgroup/" + this.localStorage.get("userlogin")["username"]
    );
    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        this.groupresult = httpResponse.value.data.result;
        this.groupOrder(this.orderByGroup.order, this.orderByGroup.key);
      } else {
        this.alert.alert("error", httpResponse.value.message);
      }
    }
  };

  public selectStudent = async (data: string) => {
    this.selectStudentgroup = data;
    this.studentInGroup = null;
    let httpResponse: any = await this.http.get("group/showstudent/" + data);
    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        this.studentInGroup = httpResponse.value.data.result;
        this.studentOrder(this.orderByStudent.order, this.orderByStudent.key);
        // console.log(this.studentInGroup);
      } else {
        this.alert.alert("error", httpResponse.value.message);
      }
    }
  };

  public studentOrder = (order: string, key: string) => {
    this.orderByStudent = {
      order: order,
      key: key
    };

    let n = this.studentInGroup.length;
    for (let i = 1; i < n; ++i) {
      let keysort = this.studentInGroup[i][key];
      let keysort2 = this.studentInGroup[i];

      let j = i - 1;
      while (
        j >= 0 &&
        this.studentInGroup[j][key].localeCompare(keysort) ==
          (order == "desc" ? -1 : 1)
      ) {
        this.studentInGroup[j + 1] = this.studentInGroup[j];
        j = j - 1;
      }
      this.studentInGroup[j + 1] = keysort2;
    }
  };

  public groupOrder = (order: string, key: string) => {
    this.orderByGroup = {
      order: order,
      key: key
    };
  };

  public groupOrderSearch = (arr2: Array<any>, order: string, key: string) => {
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
