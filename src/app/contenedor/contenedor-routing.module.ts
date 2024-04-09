import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexContenedorComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { MapComponent } from './map/map.component';
import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
  { path: 'kml-Contenedor/index/:idKmlContenedor/contenedor', redirectTo: 'kml-Contenedor/index/:idKmlContenedor/contenedor/index', pathMatch: 'full'},
  { path: 'kml-Contenedor/index/:idKmlContenedor/contenedor/index', component: IndexContenedorComponent },
  { path: 'kml-Contenedor/index/:idKmlContenedor/contenedor/map/:idContenedor', component: MapComponent },
  { path: 'kml-Contenedor/index/:idKmlContenedor/contenedor/maps', component: MapsComponent },
  { path: 'kml-Contenedor/index/:idKmlContenedor/contenedor/edit/:idContenedor', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenedorRoutingModule { }
