import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppointmentTableComponent } from './components/appointment-table/appointment-table.component';
import { OtpComponent } from './components/otp/otp.component';
import { CounterDirective } from './directives/counter.directive';
import { FormatPhonePipe } from './pipes/format-phone.pipe';
import { MaskPhonePipe } from './pipes/mask-phone.pipe';
import { SafePipe } from './pipes/safe.pipe';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
];

const components = [
  AppointmentTableComponent,
  OtpComponent
];

const pipes = [
  FormatPhonePipe,
  MaskPhonePipe,
  SafePipe
];

const directives = [
  CounterDirective
];

@NgModule({
  declarations: [...components, ...directives, ...pipes],
  imports: [...materialModules, ReactiveFormsModule, CommonModule],
  exports: [...components, ...directives, ...pipes, ...materialModules],
  providers: [SafePipe]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
