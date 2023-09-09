import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexRutaComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { MapComponent } from './map/map.component';
import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
  { path: 'kml-Ruta/index/:idKmlRuta/ruta/index', component: IndexRutaComponent },
  { path: 'kml-Ruta/index/:idKmlRuta/ruta/map/:idRuta', component: MapComponent },
  { path: 'kml-Ruta/index/:idKmlRuta/ruta/maps', component: MapsComponent },
  { path: 'kml-Ruta/index/:idKmlRuta/ruta/edit/:idRuta', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutaRoutingModule { }
