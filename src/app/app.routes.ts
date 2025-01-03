import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    { path: '', loadComponent: () => 
        import('@employee-offboarding/employees')
            .then(m => m.EmployeesComponent) },
    { path: 'employee/:id', loadComponent: () => 
        import('@employee-offboarding/employees')
            .then(m => m.EmployeeDetailsComponent) }
];
