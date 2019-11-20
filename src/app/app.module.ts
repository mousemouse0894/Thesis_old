import { StudentGuard } from "./guards/student.guard";
import { TeacherGuard } from "./guards/teacher.guard";
import { AppService } from "./services/app.service";
import { AlertService } from "./services/alert.service";
import { AppGuard } from "./guards/app.guard";
import { SharedModules } from "./shared-modules";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { UserloginReducer } from "./store/userlogin/userlogin.reducer";
import { LoginComponent } from "./components/login/login.component";
import { ToastrModule } from "ngx-toastr";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { HttpService } from "./services/http.service";
import { LocalstorageService } from "./services/localstorage.service";
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material/core";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { DefaultLayoutComponent } from "./components/default-layout/default-layout.component";
import { RecaptchaModule } from "ng-recaptcha";
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    DefaultLayoutComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      userlogin: UserloginReducer
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-top-right",
      preventDuplicates: true
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      backdropBackgroundColour: "rgba(0,0,0,0.45)",
      backdropBorderRadius: "3px",
      primaryColour: "#007BFF",
      secondaryColour: "#6C757D",
      tertiaryColour: "#ffffff"
    }),
    SharedModules,
    RecaptchaModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "th-TH" },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: "DD/MM/YYYY"
        },
        display: {
          dateInput: "DD/MM/YYYY"
        }
      }
    },
    AppService,
    AppGuard,
    TeacherGuard,
    StudentGuard,
    HttpService,
    AlertService,
    LocalstorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
