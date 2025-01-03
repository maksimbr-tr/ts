import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmployeeFacade } from '@employee-offboarding/data-access';
import { map, combineLatest } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'lib-employees',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule
  ],
  standalone: true,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  private readonly employeeFacade: EmployeeFacade = inject(EmployeeFacade);
  private readonly fb: FormBuilder = inject(FormBuilder);

  protected readonly searchForm = this.fb.group({
    search: ['']
  });

  protected readonly employees$ = combineLatest([this.employeeFacade.employees$, this.searchForm.valueChanges.pipe(distinctUntilChanged(), startWith({search: ''}))]).pipe(map(([employees, searchTerm]) => new MatTableDataSource(!searchTerm.search && searchTerm.search === undefined ? employees : employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.search!) ||
    employee.department.toLowerCase().includes(searchTerm.search!)
  ) || [])));

  clearSearch() {
    this.searchForm.get('search')!.setValue('');
  }
}