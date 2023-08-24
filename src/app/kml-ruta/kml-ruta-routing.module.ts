import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: 'kml-Ruta', redirectTo: 'kml-Ruta/index', pathMatch: 'full'},
  { path: 'kml-Ruta/index', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KmlRutaRoutingModule { }
