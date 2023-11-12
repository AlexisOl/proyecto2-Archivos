import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { archivos } from '../models/archivos';
import { carpetas } from '../models/carpetas';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminServicioService {


  readonly URL = "http://localhost:8080/api/";
  constructor(private http: HttpClient) { }

  //ver la papelera GENERAL
  public verPapeleraGeneral(ubicacion:string, usuario:string):Observable<archivos> {
    let papelera = "Papelera";
    return this.http.get<archivos>(this.URL+"verPapeleraGeneral?papelera="+papelera+"&ubicacion="+ubicacion+"&usuario="+usuario);
  }
  //ver papelera de un usuario especifico

  //ver carpetas de papelera GENERAL
  public verPapeleraCarpetasGeneral(ubicacion:string, usuario:string):Observable<carpetas> {
    let papelera= "Papelera";
    return this.http.get<carpetas>(this.URL+"verPapeleraCarpetasGeneral?papelera="+papelera+"&ubicacion="+ubicacion+"&usuario="+usuario);
  }
  //ver papelera de carpetas de un usuario especifico
  //primero traer todos los usuarios
  public verUsuariosGenerales():Observable<user> {
    return this.http.get<user>(this.URL+"verTodosUsuarios");
  }


  // para crear nuevos usuarios

  public crearNuevoUser(usuarios: user):Observable<user> {
    return this.http.post<user>(this.URL+"ingresoNuevoUser",usuarios);



  }
}
