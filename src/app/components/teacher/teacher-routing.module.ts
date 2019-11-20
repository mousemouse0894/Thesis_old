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
      { path: "store", component: ManageExamStoreComponent },
      { path: "", pathMatch: "full", redirectTo: "/teacher/group" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
