import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeFacade } from '@employee-offboarding/data-access';
import { Employee, OffboardingRequest } from '@employee-offboarding/models';

@Component({
  selector: 'lib-offboarding-form',
  templateUrl: './offboarding-form.component.html',
  standalone: true,
  styles: `

    :host {
      width: 500px;
      padding: 20px;
      display: block;
    }
    h2 {
      text-align: center;
      margin-bottom: 20px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .mat-form-field {
      width: 100%;
    }

    .form-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  `,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class OffboardingFormComponent {
  private readonly employeeFacade: EmployeeFacade = inject(EmployeeFacade);
  private readonly fb: FormBuilder = inject(FormBuilder);
  protected readonly dialogRef: MatDialogRef<OffboardingFormComponent> = inject(MatDialogRef);
  protected readonly data: { employee: Employee } = inject(MAT_DIALOG_DATA);

  protected readonly offboardingForm: FormGroup = this.fb.group({
    streetLine1: ['', Validators.required],
    country: ['', Validators.required],
    postalCode: ['', Validators.required],
    receiver: ['', Validators.required],
    notes: [''],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  offboard() {
    if (this.offboardingForm.valid) {
      const request = this.offboardingForm.value as OffboardingRequest;
      this.employeeFacade.offboardEmployee(this.data.employee.id, request, this.data.employee);
      this.dialogRef.close();
    }
  }
}