import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContenedorRoutingModule } from './contenedor-routing.module';
import { IndexContenedorComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { MapComponent } from './map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapsComponent } from './maps/maps.component';


@NgModule({
  declarations: [
    IndexContenedorComponent,
    EditComponent,
    MapComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    ContenedorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContenedorModule { }
