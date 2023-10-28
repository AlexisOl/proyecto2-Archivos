import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { archivos } from '../models/archivos';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosServicioService {


  readonly URL ="http://localhost:8080/api/"
  constructor(private http:HttpClient) { }


  //funcion para ingresar archivos
  public ingresoArchivo(archivo:archivos):Observable<archivos>{
    return this.http.post<archivos>(this.URL+"ingresoArchivo",archivo);
  }
  // funcion para obtener archivos
  // PARA FUTURO -> ENVIARLE CON UNA DIRECCION DE CARPETA y usuario
  public obtenerArchivos():Observable<archivos> {
    return this.http.get<archivos>(this.URL+"/obtenerArchivos");
  }



}
