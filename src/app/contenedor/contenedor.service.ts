import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contenedor } from './contenedor';
@Injectable({
  providedIn: 'root'
})
export class ContenedorService {
  private apiURL = "http://localhost:8000/api/kmlContenedor/";

getUrlWithIdAndContenedor(idKmlContenedor: number): string {
  return `${this.apiURL}${idKmlContenedor}/contenedor`;
}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }
  constructor(private httpClient: HttpClient) { }
  getAll(idKmlContenedor: number): Observable<Contenedor[]> {
    const url = this.getUrlWithIdAndContenedor(idKmlContenedor);
    return this.httpClient.get<Contenedor[]>(url)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  create(idKmlContenedor: number, contenedor: Contenedor): Observable<Contenedor> {
    const url = this.getUrlWithIdAndContenedor(idKmlContenedor);
    return this.httpClient.post<Contenedor>(url, JSON.stringify(contenedor), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  find(idKmlContenedor: number, id: number): Observable<Contenedor> {
    const urlId = this.getUrlWithIdAndContenedor(idKmlContenedor);
    const url = `${urlId}/${id}`;
    return this.httpClient.get<Contenedor>(url)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  update(idKmlContenedor: number, id: number, contenedor: Contenedor): Observable<Contenedor> {
    const urlId = this.getUrlWithIdAndContenedor(idKmlContenedor);
    const url = `${urlId}/${id}`;
    return this.httpClient.put<Contenedor>(url, JSON.stringify(contenedor), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  delete(idKmlContenedor: number, id: number): Observable<Contenedor> {
    const urlId = this.getUrlWithIdAndContenedor(idKmlContenedor);
    const url = `${urlId}/${id}`;
    return this.httpClient.delete<Contenedor>(url, this.httpOptions)
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
