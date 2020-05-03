import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';
import { VstarsRoutingModule } from './vstars-routing.module';

@NgModule({
  declarations: [ ...fromComponents.components ],
  imports: [
    CommonModule,
    VstarsRoutingModule
  ]
})
export class VstarsModule { }
