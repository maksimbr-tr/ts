import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { EmployeeState, initialState, employeeReducer, loadEmployees, loadEmployeesSuccess, offboardEmployeeSuccess } from './employee.state';
import { Employee } from '@employee-offboarding/models';

describe('EmployeeState', () => {
  let store: MockStore;
  const mockEmployees: Employee[] = [
    { id: '1', name: 'John Doe', department: 'Engineering', status: 'ACTIVE', email: 'john.doe@example.com', equipments: [] },
    { id: '2', name: 'Jane Smith', department: 'Marketing', status: 'ACTIVE', email: 'jane.smith@example.com', equipments: [] }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState })
      ]
    });

    store = TestBed.inject(MockStore);
  });

  it('should set loading to true on loadEmployees', () => {
    const action = loadEmployees();
    const result = employeeReducer(initialState, action);
    expect(result.loading).toBe(true);
  });

  it('should load employees on loadEmployeesSuccess', () => {
    const action = loadEmployeesSuccess({ employees: mockEmployees });
    const result = employeeReducer(initialState, action);
    expect(result.loading).toBe(false);
    expect(result.entities['1']).toEqual(mockEmployees[0]);
    expect(result.entities['2']).toEqual(mockEmployees[1]);
  });

  it('should update employee status on offboardEmployeeSuccess', () => {
    const updatedEmployee: Employee = { ...mockEmployees[0], status: 'OFFBOARDED' };
    const action = offboardEmployeeSuccess({ employee: updatedEmployee });
    const stateWithEmployees = employeeReducer(initialState, loadEmployeesSuccess({ employees: mockEmployees }));
    const result = employeeReducer(stateWithEmployees, action);
    expect(result.entities['1']?.status).toBe('OFFBOARDED');
  });
});