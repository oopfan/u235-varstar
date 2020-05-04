import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'vstars', component: fromComponents.VstarsHomeComponent },
  { path: 'vstar-overview/:id', component: fromComponents.VstarOverviewComponent },
  { path: 'vstar-observations/:id', component: fromComponents.VstarObservationsComponent },
  { path: 'vstar-light-curve/:id', component: fromComponents.VstarLightCurveComponent },
  { path: 'vstar-phase-plot/:id', component: fromComponents.VstarPhasePlotComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VstarsRoutingModule { }
