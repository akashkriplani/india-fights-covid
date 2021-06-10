import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CounterDirective } from './directives/counter.directive';
import { OtpComponent } from './components/otp/otp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaskPhonePipe } from './pipes/mask-phone.pipe';
import { FormatPhonePipe } from './pipes/format-phone.pipe';

const materialModules = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatGridListModule
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
  exports: [...materialModules, ...components, ...directives, ...pipes]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
