import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

@NgModule({
  declarations: [
    // ... other components
    EditEmployeeComponent
  ],
  imports: [
    // ... other imports
    ReactiveFormsModule,
    HttpClientModule
  ],
  // ...
})
export class AppModule { } 