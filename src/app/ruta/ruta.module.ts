import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutaRoutingModule } from './ruta-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    RutaRoutingModule,
    GoogleMapsModule
  ]
})
export class RutaModule { }
