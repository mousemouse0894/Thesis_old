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
export class AppGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorage: LocalstorageService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorage.get("userlogin")) {
      return true;
    }
    this.router.navigate(["/login"], { queryParams: { routeNext: state.url } });
    return false;
  }
}
