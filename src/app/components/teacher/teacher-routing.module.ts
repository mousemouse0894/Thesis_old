import { DatabaseServerComponent } from "./manage-exam-store/database-server/database-server.component";
import { UnitComponent } from "./manage-exam-store/unit/unit.component";
import { ExamComponent } from "./manage-exam-store/exam/exam.component";
import { ManageAccessComponent } from "./manage-access/manage-access.component";
import { ManageExamStoreComponent } from "./manage-exam-store/manage-exam-store.component";
import { ManageGroupComponent } from "./manage-group/manage-group.component";
import { TeacherComponent } from "./teacher.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: TeacherComponent,
    children: [
      { path: "group", component: ManageGroupComponent },
      {
        path: "store",
        component: ManageExamStoreComponent,
        children: [
          { path: "exam", component: ExamComponent },
          { path: "unit", component: UnitComponent },
          { path: "database-server", component: DatabaseServerComponent },
          { path: "", redirectTo: "/teacher/store/exam", pathMatch: "full" }
        ]
      },
      { path: "access", component: ManageAccessComponent },
      { path: "", pathMatch: "full", redirectTo: "/teacher/group" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
