import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutaRoutingModule } from './ruta-routing.module';
import { IndexRutaComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { MapComponent } from './map/map.component';
import { MapsComponent } from './maps/maps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexRutaComponent,
    EditComponent,
    MapComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    RutaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RutaModule { }
