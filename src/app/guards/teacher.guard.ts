import { Router } from "@angular/router";
import { LocalstorageService } from "./../services/localstorage.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class TeacherGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorage: LocalstorageService
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorage.get("userlogin")["role"] == "4500") {
      this.router.navigate(["/notfound"]);
      return false;
    }
    return true;
  }
}
