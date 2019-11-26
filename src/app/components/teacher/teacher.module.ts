import { SharedModules } from "./../../shared-modules";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TeacherRoutingModule } from "./teacher-routing.module";
import { TeacherComponent } from "./teacher.component";
import { ManageGroupComponent } from "./manage-group/manage-group.component";
import { ManageExamStoreComponent } from "./manage-exam-store/manage-exam-store.component";
import { ManageAccessComponent } from './manage-access/manage-access.component';

@NgModule({
  declarations: [
    TeacherComponent,
    ManageGroupComponent,
    ManageExamStoreComponent,
    ManageAccessComponent
  ],
  imports: [CommonModule, TeacherRoutingModule, SharedModules]
})
export class TeacherModule {}
