import { LocalstorageService } from "./../services/localstorage.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class StudentGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorage: LocalstorageService
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorage.get("userlogin")["role"] == "4500") return true;
    this.router.navigate(["/notfound"]);
    return false;
  }
}
