import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KmlContenedor  } from './kml-contenedor';
import { Contenedor  } from '../contenedor/contenedor';

@Injectable({
  providedIn: 'root'
})
export class KmlContenedorService {
  private apiURL = "http://localhost:8000/api/kmlContenedor/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }
  constructor(private httpClient: HttpClient) { }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getAll(): Observable<KmlContenedor[]> {
    return this.httpClient.get<KmlContenedor[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(kmlContenedor: KmlContenedor): Observable<KmlContenedor> {
    const formData = new FormData();
    formData.append('file', kmlContenedor.archivo_kml);

    // Agregar cualquier otra información al formData si es necesario
    formData.append('fecha', kmlContenedor.fecha_carga.toISOString());

    return this.httpClient.post<KmlContenedor>(this.apiURL, formData)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  find(id_kml_contenedor:number): Observable<KmlContenedor> {
    return this.httpClient.get<KmlContenedor>(this.apiURL + id_kml_contenedor)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id_kml_contenedor:number){
    return this.httpClient.delete<KmlContenedor>(this.apiURL + id_kml_contenedor, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getUrlWithIdAndContenedor(idKmlContenedor: number): string {
    return `${this.apiURL}${idKmlContenedor}/contenedor`;
  }
  createContenedor(idKmlContenedor: number, contenedor: Contenedor): Observable<Contenedor> {
    const url = this.getUrlWithIdAndContenedor(idKmlContenedor);
    return this.httpClient.post<Contenedor>(url, JSON.stringify(contenedor), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
