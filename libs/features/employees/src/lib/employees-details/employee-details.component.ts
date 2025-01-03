import { Component, OnInit, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { EmployeeFacade } from '@employee-offboarding/data-access';
import { Employee } from '@employee-offboarding/models';
import { map } from 'rxjs/operators';
import { OffboardingFormComponent } from '@employee-offboarding/offboarding';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule
  ]
})
export class EmployeeDetailsComponent {
  @Input() id = '';

  private readonly employeeFacade: EmployeeFacade = inject(EmployeeFacade);
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly router = inject(Router);


  employee$ = this.employeeFacade.employees$.pipe(
    map(employees => employees.find(emp => emp.id === this.id))
  );

  openOffboardingForm(employee: Employee) {
    const dialog = this.dialog.open(OffboardingFormComponent, {
      data: { employee }
    });

    dialog.afterClosed().subscribe(() => this.router.navigate(['/']));
  }

  navigateBack() {
    this.router.navigate(['/']);
  }
}