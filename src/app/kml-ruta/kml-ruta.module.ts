import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KmlRutaRoutingModule } from './kml-ruta-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    KmlRutaRoutingModule
  ]
})
export class KmlRutaModule { }
