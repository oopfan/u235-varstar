import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import * as fromComponents from './components';
import { VarStarsRoutingModule } from './varstars-routing.module';

@NgModule({
  declarations: [ ...fromComponents.components ],
  imports: [
    CommonModule,
    ChartsModule,
    VarStarsRoutingModule
  ]
})
export class VarStarsModule { }
