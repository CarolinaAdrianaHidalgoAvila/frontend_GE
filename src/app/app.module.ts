import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { VideosModule } from './videos/videos.module';
import { RutaModule } from './ruta/ruta.module';
import { PrincipalModule } from './principal/principal.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { KmlContenedorModule } from './kml-contenedor/kml-contenedor.module';
import { ContenedorModule } from './contenedor/contenedor.module';
import { KmlRutaModule } from './kml-ruta/kml-ruta.module';

import { ComponentesModule } from './componentes/componentes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VideosModule,
    RutaModule,
    PrincipalModule,
    KmlContenedorModule,
    KmlRutaModule,
    HttpClientModule,
    GoogleMapsModule,
    NgbModule,
    ContenedorModule,
    ComponentesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }