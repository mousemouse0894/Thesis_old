import { SharedModules } from "./../../shared-modules";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StudentRoutingModule } from "./student-routing.module";
import { StudentComponent } from "./student.component";
import { StudentGroupComponent } from './student-group/student-group.component';
import { StudentTestComponent } from './student-test/student-test.component';
import { StudentHistoryComponent } from './student-history/student-history.component';

@NgModule({
  declarations: [StudentComponent, StudentGroupComponent, StudentTestComponent, StudentHistoryComponent],
  imports: [CommonModule, StudentRoutingModule, SharedModules]
})
export class StudentModule {}
