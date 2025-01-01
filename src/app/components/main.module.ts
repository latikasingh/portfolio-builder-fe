import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountUpDirective } from '../directives/count.directive';

import { Theme1Module } from './theme1/theme1.module';
import { Theme2Module } from './theme2/theme2.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, Theme1Module, Theme2Module, CountUpDirective],
  exports: [CommonModule, Theme1Module, Theme2Module],
})
export class MainModule {}
