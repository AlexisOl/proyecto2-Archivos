import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginservicioService {


  readonly URL = "http://localhost:8080/api/"


  constructor(private http: HttpClient) {}



  //funcion para obtener a los usuarios
  public getUsuario(nombre:string, password:string):Observable<user>{
    return this.http.get<user>(this.URL+'prueba?nombre='+nombre+"&password="+password)
  }

}
