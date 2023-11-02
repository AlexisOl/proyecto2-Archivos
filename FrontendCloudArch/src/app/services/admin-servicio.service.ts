import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { archivos } from '../models/archivos';
import { carpetas } from '../models/carpetas';

@Injectable({
  providedIn: 'root'
})
export class AdminServicioService {


  readonly URL = "http://localhost:8080/api/";
  constructor(private http: HttpClient) { }

  //ver la papelera GENERAL
  public verPapeleraGeneral(ubicacion:string):Observable<archivos> {
    let papelera = "Papelera";
    return this.http.get<archivos>(this.URL+"verPapeleraGeneral?papelera="+papelera+"&ubicacion="+ubicacion);
  }
  //ver papelera de un usuario especifico

  //ver carpetas de papelera GENERAL
  public verPapeleraCarpetasGeneral(ubicacion:string):Observable<carpetas> {
    let papelera= "Papelera";
    return this.http.get<carpetas>(this.URL+"verPapeleraCarpetasGeneral?papelera="+papelera+"&ubicacion="+ubicacion);
  }
  //ver papelera de carpetas de un usuario especifico
}
