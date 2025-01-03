import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OffboardingRequest, Employee } from '@employee-offboarding/models';
import { loadEmployees, offboardEmployee } from './employee.state';
import { selectAllEmployees, selectLoading } from './employee.state';

@Injectable({ providedIn: 'root' })
export class EmployeeFacade {
    private readonly store = inject(Store)

    readonly employees$ = this.store.select(selectAllEmployees);
    readonly loading$ = this.store.select(selectLoading);

    loadEmployees() {
        this.store.dispatch(loadEmployees());
    }

    offboardEmployee(id: string, request: OffboardingRequest, employee: Employee) {
        this.store.dispatch(offboardEmployee({ id, request, employee }));
    }
}