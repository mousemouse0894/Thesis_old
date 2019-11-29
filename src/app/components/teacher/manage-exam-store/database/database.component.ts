import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "./../../../../services/app.service";
import { LocalstorageService } from "./../../../../services/localstorage.service";
import { HttpService } from "./../../../../services/http.service";
import { AlertService } from "./../../../../services/alert.service";

@Component({
  selector: "app-database",
  templateUrl: "./database.component.html",
  styleUrls: ["./database.component.scss"]
})
export class DatabaseComponent implements OnInit {
  public formGroup: FormGroup;
  public getDatabseResult: any = null;
  public pagiShowdatabase: number = 1;
  constructor(
    private alert: AlertService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    public localStorage: LocalstorageService,
    public service: AppService
  ) {}

  ngOnInit() {
    this.getDatabase();
  }

  private getDatabase = async () => {
    this.getDatabseResult = null;
    let httpResponse: any = await this.http.get("manageExam/showdatabase");
    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        this.getDatabseResult = httpResponse.value.data.result;
      } else {
        this.alert.alert("error", httpResponse.value.message);
      }
    }
  };

  public selectDatabase = () => {};

  public searchDatabase = (array: any, searchString: string) => {
    if (searchString.length > 0) {
      return array.filter(value => value.Database.indexOf(searchString) > -1);
    } else {
      return array;
    }
  };
}
