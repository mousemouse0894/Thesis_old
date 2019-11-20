import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AppService {
  public loadingState: boolean = false;
  constructor() {}
}
