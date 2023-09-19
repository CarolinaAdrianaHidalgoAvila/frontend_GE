import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KmlRutaRoutingModule } from './kml-ruta-routing.module';
import { IndexComponent } from './index/index.component';
import { ComponentesModule } from '../componentes/componentes.module';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    KmlRutaRoutingModule,
    ComponentesModule
  ]
})
export class KmlRutaModule { }
