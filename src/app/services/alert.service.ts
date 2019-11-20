import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor(private toastr: ToastrService) {}

  public confirmAlert = (title: string, text: string = "") => {
    return new Promise(resolve => {
      Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#007BFF",
        cancelButtonColor: "#DC3545",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
        focusCancel: true,
        focusConfirm: false
      }).then(result => {
        if (result.value) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  public alert = (
    type: "error" | "success" | "info" | "warning",
    title: string,
    message: string = ""
  ) => {
    switch (type) {
      case "success":
        this.toastr.success(message, title);
        break;
      case "error":
        this.toastr.error(message, title);
        break;
      case "info":
        this.toastr.info(message, title);
        break;
      case "warning":
        this.toastr.warning(message, title);
        break;
    }
  };
}
