import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { loadEmployees, loadEmployeesSuccess, offboardEmployee, offboardEmployeeSuccess } from './employee.state';
import { Employee } from '@employee-offboarding/models';

export const loadEmployeesEffect = createEffect(
    (actions$ = inject(Actions), http = inject(HttpClient)) => {
        return actions$.pipe(
            ofType(loadEmployees),
            exhaustMap(() =>
                http.get<Employee[]>('http://localhost:3200/employees').pipe(
                    map(employees => loadEmployeesSuccess({ employees })),
                    catchError(() => of({ type: '[Employee] Load Failure' }))
                )
            )
        );
    },
    { functional: true }
);

export const offboardEmployeeEffect = createEffect(
    (actions$ = inject(Actions), http = inject(HttpClient)) => {
        return actions$.pipe(
            ofType(offboardEmployee),
            exhaustMap(action =>
                http.post<{ id: string, status: string }>(`http://localhost:3200/offboard`, { id: action.id }).pipe(
                    map(response => {
                        const updatedEmployee: Employee = {
                            ...action.employee,
                            equipments: [],
                            status: 'OFFBOARDED'
                        };
                        return offboardEmployeeSuccess({ employee: updatedEmployee });
                    }),
                    catchError(() => of({ type: '[Employee] Offboard Failure' }))
                )
            )
        );
    },
    { functional: true }
);