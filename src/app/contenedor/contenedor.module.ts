import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContenedorRoutingModule } from './contenedor-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MapaComponent } from './mapa/mapa.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    MapaComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    ContenedorRoutingModule
  ]
})
export class ContenedorModule { }
