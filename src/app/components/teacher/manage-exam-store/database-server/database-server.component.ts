import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";
import { HttpService } from "src/app/services/http.service";
import { FormBuilder } from "@angular/forms";
import { LocalstorageService } from "src/app/services/localstorage.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-database-server",
  templateUrl: "./database-server.component.html",
  styleUrls: ["./database-server.component.scss"]
})
export class DatabaseServerComponent implements OnInit {
  public getDatabseResult: any = null;
  public getTablet: any = null;
  public pagiShowdatabase: number = 1;
  public pagiShowTable: number = 1;
  public resultTable: any = null;
  public nameTable: any = null;
  public pagiShowdatabaseResult: number = 1;
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

  public searchDatabase = (array: any, searchString: string) => {
    if (searchString.length > 0) {
      return array.filter(value => value.Database.indexOf(searchString) > -1);
    } else {
      return array;
    }
  };

  public getTable = async (table: string) => {
    this.getTablet = null;
    let httpResponse: any = await this.http.get(
      `manageExam/showtable/${table}`
    );
    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        this.getTablet = httpResponse.value.data.result;
      } else {
        this.alert.alert("error", httpResponse.value.message);
      }
    }
  };

  public getResultTable = async (database, table) => {
    this.resultTable = null;
    this.nameTable = table;
    let httpResponse: any = await this.http.get(
      `manageExam/showtabledata/${database}/${table}`
    );
    if (httpResponse.connect) {
      if (httpResponse.value.result == true) {
        this.resultTable = httpResponse.value.data.result;
      } else {
        this.alert.alert("error", httpResponse.value.message);
      }
    }
  };

  public getKeyObject = array => {
    if (array.length > 0) {
      let ObjectData = [...array];
      return Object.keys(ObjectData[0]);
    } else if (typeof array == "object") {
      return Object.keys(array);
    } else {
      return [];
    }
  };
}
