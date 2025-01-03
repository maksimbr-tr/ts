import { Route } from '@angular/router';
import { EmployeesComponent, EmployeeDetailsComponent } from '@employee-offboarding/employees'

export const appRoutes: Route[] = [
    { path: '', component: EmployeesComponent },
    { path: 'employee/:id', component: EmployeeDetailsComponent }
];
