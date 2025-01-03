import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeFacade } from '@employee-offboarding/data-access';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'employee-offboarding';
  private readonly employeeFacade: EmployeeFacade = inject(EmployeeFacade);

  ngOnInit() {
    this.employeeFacade.loadEmployees();
  }
}
