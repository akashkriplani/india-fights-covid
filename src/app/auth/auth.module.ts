import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthRoutingModule.components],
  imports: [AuthRoutingModule, CommonModule, ReactiveFormsModule, SharedModule]
})
export class AuthModule {}
