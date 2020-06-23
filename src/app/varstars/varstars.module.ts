import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import * as fromComponents from './components';
import { LoadingModule } from '../loading/loading.module';
import { VarStarsRoutingModule } from './varstars-routing.module';

@NgModule({
  declarations: [ ...fromComponents.components ],
  imports: [
    CommonModule,
    ChartsModule,
    LoadingModule,
    VarStarsRoutingModule
  ]
})
export class VarStarsModule { }
