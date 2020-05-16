import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'varstars', component: fromComponents.VarStarsHomeComponent },
  { path: 'overview/:id', component: fromComponents.VarStarOverviewComponent },
  { path: 'observations/:id', component: fromComponents.VarStarObservationsComponent },
  { path: 'light-curve/:id', component: fromComponents.VarStarLightCurveComponent },
  { path: 'phase-plot/:id', component: fromComponents.VarStarPhasePlotComponent },
  { path: 'gallery/:id', component: fromComponents.VarStarGalleryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VarStarsRoutingModule { }
