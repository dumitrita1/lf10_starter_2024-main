import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

@NgModule({
  declarations: [
    EditEmployeeComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],

})
export class AppModule { } 