import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KmlRuta } from './kml-ruta';
import { Ruta  } from '../ruta/ruta';


@Injectable({
  providedIn: 'root'
})
export class KmlRutaService {
  private apiURL = "http://localhost:8000/api/kmlRuta/";
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

  getAll(): Observable<KmlRuta[]> {
    return this.httpClient.get<KmlRuta[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(kmlRuta: KmlRuta): Observable<KmlRuta> {
    const formData = new FormData();
    formData.append('file', kmlRuta.archivo_kml);

    // Agregar cualquier otra información al formData si es necesario
    formData.append('fecha', kmlRuta.fecha_carga.toISOString());

    return this.httpClient.post<KmlRuta>(this.apiURL, formData)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  find(id_kml_ruta:number): Observable<KmlRuta> {
    return this.httpClient.get<KmlRuta>(this.apiURL + id_kml_ruta)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id_kml_ruta:number){
    return this.httpClient.delete<KmlRuta>(this.apiURL + id_kml_ruta, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getUrlWithIdAndRuta(idKmlRuta: number): string {
    return `${this.apiURL}${idKmlRuta}/ruta`;
  }
  createRuta(idKmlRuta: number, ruta: Ruta): Observable<Ruta> {
    const url = this.getUrlWithIdAndRuta(idKmlRuta);
    return this.httpClient.post<Ruta>(url, JSON.stringify(ruta), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
