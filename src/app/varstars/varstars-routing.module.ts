import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'varstars', component: fromComponents.VarStarsHomeComponent },
  { path: 'varstar-overview/:id', component: fromComponents.VarStarOverviewComponent },
  { path: 'varstar-observations/:id', component: fromComponents.VarStarObservationsComponent },
  { path: 'varstar-light-curve/:id', component: fromComponents.VarStarLightCurveComponent },
  { path: 'varstar-phase-plot/:id', component: fromComponents.VarStarPhasePlotComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VarStarsRoutingModule { }
