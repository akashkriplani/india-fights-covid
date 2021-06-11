import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CounterDirective } from './directives/counter.directive';
import { OtpComponent } from './components/otp/otp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaskPhonePipe } from './pipes/mask-phone.pipe';
import { FormatPhonePipe } from './pipes/format-phone.pipe';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule
];

const components = [
  OtpComponent
];

const pipes = [
  MaskPhonePipe,
  FormatPhonePipe
];

const directives = [
  CounterDirective
];

@NgModule({
  declarations: [...components, ...directives, ...pipes],
  imports: [...materialModules, ReactiveFormsModule, CommonModule],
  exports: [...components, ...directives, ...pipes, ...materialModules]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
