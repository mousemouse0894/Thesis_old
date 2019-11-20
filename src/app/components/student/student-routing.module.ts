import { StudentHistoryComponent } from "./student-history/student-history.component";
import { StudentGroupComponent } from "./student-group/student-group.component";
import { StudentComponent } from "./student.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentTestComponent } from "./student-test/student-test.component";

const routes: Routes = [
  {
    path: "",
    component: StudentComponent,
    children: [
      {
        path: "group",
        component: StudentGroupComponent
      },
      {
        path: "history",
        component: StudentHistoryComponent
      },
      {
        path: "test",
        component: StudentTestComponent
      },
      {
        path: "",
        redirectTo: "/student/group",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
