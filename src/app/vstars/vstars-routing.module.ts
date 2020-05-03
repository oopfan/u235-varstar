import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'vstars', component: fromComponents.VstarsHomeComponent },
  { path: 'view-vstar/:id', component: fromComponents.VstarViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VstarsRoutingModule { }
