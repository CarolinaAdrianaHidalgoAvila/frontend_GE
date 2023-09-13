import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ruta } from './ruta';
import { PuntoLinea } from './punto-linea';
@Injectable({
  providedIn: 'root'
})
export class RutaService {
  private apiURL = "http://localhost:8000/api/kmlRuta/";

getUrlWithIdAndRuta(idKmlRuta: number): string {
  return `${this.apiURL}${idKmlRuta}/ruta`;
}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }
  constructor(private httpClient: HttpClient) { }
  getAll(idKmlRuta: number): Observable<Ruta[]> {
    const url = this.getUrlWithIdAndRuta(idKmlRuta);
    return this.httpClient.get<Ruta[]>(url)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getPuntosRuta(idKmlRuta: number, id: number): Observable<PuntoLinea[]> {
    const urlId = this.getUrlWithIdAndRuta(idKmlRuta);
    const url = `${urlId}/${id}/puntos`;
    return this.httpClient.get<PuntoLinea[]>(url)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  create(idKmlRuta: number, ruta: Ruta): Observable<Ruta> {
    const url = this.getUrlWithIdAndRuta(idKmlRuta);
    return this.httpClient.post<Ruta>(url, JSON.stringify(ruta), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  find(idKmlRuta: number, id: number): Observable<Ruta> {
    const urlId = this.getUrlWithIdAndRuta(idKmlRuta);
    const url = `${urlId}/${id}`;
    return this.httpClient.get<Ruta>(url)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  update(idKmlRuta: number, id: number, ruta: Ruta): Observable<Ruta> {
    const urlId = this.getUrlWithIdAndRuta(idKmlRuta);
    const url = `${urlId}/${id}`;
    return this.httpClient.put<Ruta>(url, JSON.stringify(ruta), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  delete(idKmlRuta: number, id: number): Observable<Ruta> {
    const urlId = this.getUrlWithIdAndRuta(idKmlRuta);
    const url = `${urlId}/${id}`;
    return this.httpClient.delete<Ruta>(url, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
