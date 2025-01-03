import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { loadEmployeesEffect, offboardEmployeeEffect } from './employee.effects';
import { Employee } from '@employee-offboarding/models';
import { loadEmployees, loadEmployeesSuccess, offboardEmployee, offboardEmployeeSuccess } from './employee.state';
import { Observable, of, throwError } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { take } from 'rxjs/operators';

describe('EmployeeEffects', () => {
  let actions$: Observable<any>;
  let httpMock: HttpTestingController;

  const mockEmployees: Employee[] = [
    { id: '1', name: 'John Doe', department: 'Engineering', status: 'ACTIVE', email: 'john.doe@example.com', equipments: [] },
    { id: '2', name: 'Jane Smith', department: 'Marketing', status: 'ACTIVE', email: 'jane.smith@example.com', equipments: [] }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore()
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should load employees', (done) => {
    actions$ = of(loadEmployees());

    TestBed.runInInjectionContext(() => {
      loadEmployeesEffect(actions$).pipe(take(1)).subscribe(action => {
        expect(action).toEqual(loadEmployeesSuccess({ employees: mockEmployees }));
        done();
      });
    });

    const req = httpMock.expectOne('http://localhost:3200/employees');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });

  it('should offboard employee', (done) => {
    const employee = mockEmployees[0];
    const offboardedEmployee: Employee = { ...employee, status: 'OFFBOARDED' as 'OFFBOARDED' };
    actions$ = of(offboardEmployee({ id: employee.id, request: { address: { streetLine1: '', country: '', postalCode: '', receiver: '' }, notes: '', phone: '', email: '' }, employee }));

    TestBed.runInInjectionContext(() => {
      offboardEmployeeEffect(actions$).pipe(take(1)).subscribe(action => {
        expect(action).toEqual(offboardEmployeeSuccess({ employee: offboardedEmployee }));
        done();
      });
    });

    const req = httpMock.expectOne('http://localhost:3200/offboard');
    expect(req.request.method).toBe('POST');
    req.flush({ id: employee.id, status: 'OFFBOARDED' });
  });

  it('should handle error when offboarding employee fails', (done) => {
    const employee = mockEmployees[0];
    actions$ = of(offboardEmployee({ id: employee.id, request: { address: { streetLine1: '', country: '', postalCode: '', receiver: '' }, notes: '', phone: '', email: '' }, employee }));

    TestBed.runInInjectionContext(() => {
      offboardEmployeeEffect(actions$).pipe(take(1)).subscribe(action => {
        expect(action).toEqual({ type: '[Employee] Offboard Failure' });
        done();
      });
    });

    const req = httpMock.expectOne('http://localhost:3200/offboard');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Network error'));
  });
});