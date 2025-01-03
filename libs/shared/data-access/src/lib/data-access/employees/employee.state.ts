import { createFeature, createReducer, createAction, props, on, createSelector } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Employee, OffboardingRequest } from '@employee-offboarding/models'

export const loadEmployees = createAction('[Employee] Load');
export const loadEmployeesSuccess = createAction(
    '[Employee] Load Success',
    props<{ employees: Employee[] }>()
);
export const offboardEmployee = createAction(
    '[Employee] Offboard',
    props<{ id: string, request: OffboardingRequest, employee: Employee }>()
);
export const offboardEmployeeSuccess = createAction(
    '[Employee] Offboard Success',
    props<{ employee: Employee }>()
);

export interface EmployeeState extends EntityState<Employee> {
    loading: boolean;
}

export const adapter: EntityAdapter<Employee> = createEntityAdapter<Employee>();

export const initialState: EmployeeState = adapter.getInitialState({
    loading: false,
});

export const employeeReducer = createReducer(
    initialState,
    on(loadEmployees, state => ({ ...state, loading: true })),
    on(loadEmployeesSuccess, (state, { employees }) => adapter.setAll(employees, { ...state, loading: false })),
    on(offboardEmployeeSuccess, (state, { employee }) => adapter.updateOne({ id: employee.id, changes: employee }, { ...state, loading: false }))
);

export const employeeFeature = createFeature({
    name: 'employee',
    reducer: employeeReducer,
});

const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const selectEmployeeState = (state: any) => state.employee;

export const selectAllEmployees = createSelector(
    selectEmployeeState,
    selectAll
);

export const selectEmployeeEntities = createSelector(
    selectEmployeeState,
    selectEntities
);

export const selectEmployeeIds = createSelector(
    selectEmployeeState,
    selectIds
);

export const selectEmployeeTotal = createSelector(
    selectEmployeeState,
    selectTotal
);

export const selectLoading = createSelector(
    selectEmployeeState,
    (state: EmployeeState) => state.loading
);