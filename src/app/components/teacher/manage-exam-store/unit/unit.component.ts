import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";
import { HttpService } from "src/app/services/http.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LocalstorageService } from "src/app/services/localstorage.service";
import { AppService } from "src/app/services/app.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-unit",
  templateUrl: "./unit.component.html",
  styleUrls: ["./unit.component.scss"]
})
export class UnitComponent implements OnInit {
  public getUnittableResult: any = null;
  public getPurposeResult: any = null;
  public stateFormUnit: boolean = false;
  public stateFormPurpose: boolean = false;
  public _windows: any = window;
  public formUnit: FormGroup;
  public formPurpose: FormGroup;
  public pagiShowUnit: number = 1;
  public pagiShowPurpose: number = 1;
  public selectUnitId: any = null;
  constructor(
    private alert: AlertService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    public localStorage: LocalstorageService,
    public service: AppService
  ) {}

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.getPurposeResult,
      event.previousIndex,
      event.currentIndex
    );
  }

  ngOnInit() {
    this.formUnit = this.formBuilder.group({
      name: ["", Validators.required],
      text: ["", Validators.required],
      owner: [this.localStorage.get("userlogin")["username"]]
    });

    this.formPurpose = this.formBuilder.group({
      parent: ["", Validators.required],
      name: ["", Validators.required],
      text: ["", Validators.required],
      owner: [this.localStorage.get("userlogin")["username"]]
    });

    this.getUnitTable();
  }

  public searchUnit = (array: any, searchString: string) => {
    if (searchString.length > 0) {
      return Array.from(
        new Set([
          ...array.filter(value => value.name.indexOf(searchString) > -1),
          ...array.filter(value => value.text.indexOf(searchString) > -1)
        ])
      );
    } else {
      return array;
    }
  };

  public onDeleteUnit = () => {
    let dataDelete = {
      id: this.formUnit.value.id,
      owner: this.localStorage.get("userlogin")["username"]
    };
    this.alert
      .confirmAlert(
        "ยืนยันการลบหน่วยการเรียนรู้",
        "จุดประสงค์ในหน่วยการเรียนรู้นี้จะถูกลบด้วยทั้งหมด"
      )
      .then(async (value: boolean) => {
        if (value) {
          this.getUnittableResult = null;
          this.service.loadingState = true;
          let formData = new FormData();
          Object.keys(dataDelete).forEach(key => {
            formData.append(`${key}`, dataDelete[key]);
          });
          let httpResponse: any = await this.http.post(
            "manageExam/delunit",
            formData
          );
          if (httpResponse.connect) {
            if (httpResponse.value.result == true) {
              this.getUnitTable();
              this._windows.$("#createUnit").modal("hide");
              this.alert.alert("success", "ลบหน่วยการเรียนรู้สำเร็จ");
            } else {
              this.alert.alert("error", httpResponse.value.message);
            }
          }

          this.service.loadingState = false;
        }
      });
  };

  public createFormUnit = (state: boolean, value: any = null) => {
    if (state == true) {
      // Insert
      this.formUnit = this.formBuilder.group({
        name: ["", Validators.required],
        text: ["", Validators.required],
        owner: [this.localStorage.get("userlogin")["username"]]
      });
    } else {
      // Update
      this.formUnit = this.formBuilder.group({
        id: [value.id, Validators.required],
        name: [value.name, Validators.required],
        text: [value.text, Validators.required],
        owner: [this.localStorage.get("userlogin")["username"]]
      });
    }
    this.stateFormUnit = state;
  };

  public submitFormUnit = async () => {
    this.getUnittableResult = null;
    if (this.stateFormUnit == true) {
      // Insert
      this.service.loadingState = true;
      let formData = new FormData();
      Object.keys(this.formUnit.value).forEach(key => {
        formData.append(`${key}`, this.formUnit.value[key]);
      });
      let httpResponse: any = await this.http.post(
        "manageExam/insertunit",
        formData
      );
      if (httpResponse.connect) {
        if (httpResponse.value.result == true) {
          this.getUnitTable();
          this._windows.$("#createUnit").modal("hide");
          this.alert.alert("success", "เพิ่มหน่วยการเรียนรู้สำเร็จ");
        } else {
          this.alert.alert("error", httpResponse.value.message);
        }
      }

      this.service.loadingState = false;
    } else {
      // Update
      this.service.loadingState = true;
      let formData = new FormData();
      Object.keys(this.formUnit.value).forEach(key => {
        formData.append(`${key}`, this.formUnit.value[key]);
      });
      let httpResponse: any = await this.http.post(
        "manageExam/updateunit",
        formData
      );
      if (httpResponse.connect) {
        if (httpResponse.value.result == true) {
          this.getUnitTable();
          this._windows.$("#createUnit").modal("hide");
          this.alert.alert("success", "เเก้ไขหน่วยการเรียนรู้สำเร็จ");
        } else {
          this.alert.alert("error", httpResponse.value.message);
        }
      }

      this.service.loadingState = false;
    }
  };

  public getUnitTable = async () => {
    let httpResponse: any = await this.http.get(
      "manageExam/showunit/" + this.localStorage.get("userlogin")["username"]
    );
    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        this.getUnittableResult = httpResponse.value.data.result;
      } else {
        this.alert.alert("error", httpResponse.value.message);
      }
    }
  };

  public createFormPurpose = (state: boolean, value: any = null) => {
    if (state == true) {
      // Insert
      this.formPurpose = this.formBuilder.group({
        parent: [value.id, Validators.required],
        name: ["", Validators.required],
        text: ["", Validators.required],
        owner: [this.localStorage.get("userlogin")["username"]]
      });
    } else {
      // Update
      this.formPurpose = this.formBuilder.group({
        parent: [value.id, Validators.required],
        name: [value.name, Validators.required],
        text: [value.text, Validators.required],
        owner: [this.localStorage.get("userlogin")["username"]]
      });
    }
    this.stateFormPurpose = state;
  };

  public submitFormPurpose = async () => {
    this.getPurposeResult = null;
    if (this.stateFormPurpose == true) {
      // Insert
      this.service.loadingState = true;
      let formData = new FormData();
      Object.keys(this.formPurpose.value).forEach(key => {
        formData.append(`${key}`, this.formPurpose.value[key]);
      });
      let httpResponse: any = await this.http.post(
        "manageExam/insertpurpose",
        formData
      );
      if (httpResponse.connect) {
        if (httpResponse.value.result == true) {
          this.getPurposeTable(this.selectUnitId);
          this._windows.$("#editPurpose").modal("hide");
          this.alert.alert("success", "เพิ่มจุดประสงค์สำเร็จ");
        } else {
          this.alert.alert("error", httpResponse.value.message);
        }
      }

      this.service.loadingState = false;
    } else {
      // Update
      this.service.loadingState = true;
      let formData = new FormData();
      Object.keys(this.formPurpose.value).forEach(key => {
        formData.append(`${key}`, this.formPurpose.value[key]);
      });
      let httpResponse: any = await this.http.post(
        "manageExam/updatepurpose",
        formData
      );
      if (httpResponse.connect) {
        if (httpResponse.value.result == true) {
          this.getPurposeTable(this.selectUnitId);
          this._windows.$("#editPurpose").modal("hide");
          this.alert.alert("success", "เเก้ไขจุดประสงค์สำเร็จ");
        } else {
          this.alert.alert("error", httpResponse.value.message);
        }
      }

      this.service.loadingState = false;
    }
  };

  public getPurposeTable = async (unitId: any) => {
    this.getPurposeResult = null;
    this.selectUnitId = unitId;
    let httpResponse: any = await this.http.get(
      "manageExam/showpurpose/" +
        this.localStorage.get("userlogin")["username"] +
        "/" +
        this.selectUnitId
    );
    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        this.getPurposeResult = httpResponse.value.data.result;
      } else {
        this.alert.alert("error", httpResponse.value.message);
      }
    }
  };

  public onDeletePurpose = (Purposeid: any) => {
    let dataDelete2 = {
      id: Purposeid,
      owner: this.localStorage.get("userlogin")["username"]
    };
    this.alert
      .confirmAlert("ยืนยันการลบจุดประสงค์")
      .then(async (value: boolean) => {
        if (value) {
          this.getPurposeResult = null;
          this.service.loadingState = true;
          let formData = new FormData();
          Object.keys(dataDelete2).forEach(key => {
            formData.append(`${key}`, dataDelete2[key]);
          });
          let httpResponse: any = await this.http.post(
            "manageExam/delpurpose",
            formData
          );
          if (httpResponse.connect) {
            if (httpResponse.value.result == true) {
              this.getPurposeTable(this.selectUnitId);
              this.alert.alert("success", "ลบจุดประสงค์สำเร็จ");
            } else {
              this.alert.alert("error", httpResponse.value.message);
            }
          }

          this.service.loadingState = false;
        }
      });
  };
}
