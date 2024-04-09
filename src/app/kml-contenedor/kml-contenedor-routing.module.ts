import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { IndexContenedorComponent } from '../contenedor/index/index.component';

const routes: Routes = [
  { path: 'kml-Contenedor', redirectTo: 'kml-Contenedor/index', pathMatch: 'full'},
  { path: 'kml-Contenedor/index', component: IndexComponent },
  { path: 'kml-Contenedor/index/:idKmlContenedor/contenedor/index', component: IndexContenedorComponent },
  { path: 'kml-Contenedor/index/:idKmlContenedor/contenedor', component: IndexComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KmlContenedorRoutingModule { }
