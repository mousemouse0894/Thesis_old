import { SharedModules } from "./../../shared-modules";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TeacherRoutingModule } from "./teacher-routing.module";
import { TeacherComponent } from "./teacher.component";
import { ManageGroupComponent } from "./manage-group/manage-group.component";
import { ManageExamStoreComponent } from "./manage-exam-store/manage-exam-store.component";
import { ManageAccessComponent } from './manage-access/manage-access.component';
import { DatabaseComponent } from './manage-exam-store/database/database.component';
import { UnitComponent } from './manage-exam-store/unit/unit.component';
import { ExamComponent } from './manage-exam-store/exam/exam.component';
import { DatabaseServerComponent } from './manage-exam-store/database-server/database-server.component';

@NgModule({
  declarations: [
    TeacherComponent,
    ManageGroupComponent,
    ManageExamStoreComponent,
    ManageAccessComponent,
    DatabaseComponent,
    UnitComponent,
    ExamComponent,
    DatabaseServerComponent
  ],
  imports: [CommonModule, TeacherRoutingModule, SharedModules]
})
export class TeacherModule {}
