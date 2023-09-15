import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KmlContenedorRoutingModule } from './kml-contenedor-routing.module';
import { IndexComponent } from './index/index.component';

import { ComponentesModule } from '../componentes/componentes.module';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    KmlContenedorRoutingModule,
    ComponentesModule
  ]
})
export class KmlContenedorModule { }
