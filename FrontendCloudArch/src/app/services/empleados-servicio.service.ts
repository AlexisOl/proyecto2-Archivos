import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { archivos } from '../models/archivos';
import { carpetas } from '../models/carpetas';
import { user } from '../models/user';

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



  //funcion para obtener archivos en base a directorio AHORA SI ES RAIZ
  public obtenerArchivosDirectorio(ubicacion: string, usuario:string):Observable<archivos> {
    return this.http.get<archivos>(this.URL+"obtenerArchivosDirectorio?ubicacion="+ubicacion+"&usuario="+usuario);
  }

  //funcion para obtener carpetas en base a directorio y usuario

  public obtenerCarpetasConDirectorio(ubicacion:string, usuario:string):Observable<carpetas> {
    return this.http.get<carpetas>(this.URL+"obtenerCarpetasDirectorio?ubicacion="+ubicacion+"&usuario="+usuario);
  }



  //funcion para ingreso de carpetas
  public ingresoCarpetas(carpetas: carpetas): Observable<carpetas> {
    return this.http.post<carpetas>(this.URL+"ingresoCarpetas", carpetas);
  }


  //funcion para ver las carpetas
  // FUTURO CAMBIAR A SOLO LAS CARPETAS DEL USUARIO
  public obtenerCarpetas():Observable<carpetas> {
    return this.http.get<carpetas>(this.URL+"/obtenerCarpetas");
  }



  //funcion para editar archivos

  public editarArchivos(archivoEnviado: archivos, identificador:any):Observable<archivos> {

    const generado = {
      archivoEnviado,
      identificador
    }

    return this.http.put<archivos>(this.URL+"editarArchivo", generado);
  }


  //funcion copiar archivo

  public copiarArchivo(archivoParaCopiar:archivos, ubicacion:string ):Observable<archivos> {

    const estructura = {
      archivoParaCopiar,
      ubicacion
    }
    return this.http.post<archivos>(this.URL+"copiarArchivo", estructura);
  }

  //funcion copiar directorios

  public copiarDirectorio(carpetaParaCopiar:carpetas, ubicacion:string){
    const estructura = {
      carpetaParaCopiar,
      ubicacion
    };

    return this.http.post<carpetas>(this.URL+"copiarCarpeta", estructura);


  }

  //funcion para busacr elemenetos en general
  public buscarElemento(nombreTexto:string|null) {
    return this.http.get(this.URL+"buscarArchivos?texto="+ nombreTexto);
  }


  //funcion para eliminar archivos
  public eliminarArchivo(archivo:archivos):Observable<any> {
    const params = new HttpParams().set('archivoEliminar', JSON.stringify(archivo));
  const options = { params: params };
    return this.http.delete(this.URL+"eliminarArchivo?archivoEliminar=",options);
  }
  //funcion para eliminar carpetas

  public eliminarCarpetas(carpetaEliminar: carpetas):Observable<any> {
    let params = new HttpParams().set('carpetaEliminar', JSON.stringify(carpetaEliminar));
    const options = { params: params };
    return this.http.delete(this.URL + "eliminarCarpeta?carpetaEliminar=", options);
  }

  //funcion de busacr elemento en base a lo que envie como expresion en la ubicacion
  public obtenerElementosRelacionadosCarpetas(ubicacionParcial: string):Observable<carpetas> {
    return this.http.get<carpetas>(this.URL+"buscarDirectoriosParecidos?ubicacion="+ubicacionParcial);
  }

  //funcion para mover archivos

  public moverArchivo(ubicacion:string, archivo: archivos):Observable<archivos> {
    const elementoGenerado = {
      ubicacion: ubicacion,
      archivos: archivo
    }
    return this.http.put<archivos>(this.URL+"moverArchivo", elementoGenerado);
  }

  //funcion para mover carpetas
  public moverCarpetas(ubicacion:string, carpeta:carpetas):Observable<carpetas> {
    const elementosGenerados = {
      ubicacion: ubicacion,
      carpetaMover : carpeta
    }
    return this.http.put<carpetas>(this.URL+"moverCarpetas", elementosGenerados);
  }


  //funcion para compartir un archivo con un usuario
  public compartirArchivo(nombre:string, archivo: archivos):Observable<archivos>{
    const elementoEstructurado = {
      nombre: nombre,
      archivosPeticion: archivo
    }
    return this.http.post<archivos>(this.URL+"compartirArchivo",elementoEstructurado);
  }

    //ver la papelera GENERAL
    public verCompartirGeneral(ubicacion:string, usuario:string|undefined):Observable<archivos> {
      return this.http.get<archivos>(this.URL+"verCompartirGeneral?usuario="+usuario+"&ubicacion="+ubicacion);
    }

    //funcion para eliminar el archivo compartido del usuario
    public eliminarArchivoCompartido(usuario: string | undefined, archivoId: string): Observable<any> {
      return this.http.delete<any>(this.URL + `eliminarArchivoCompartido?usuario=${usuario}&archivoId=${archivoId}`);
    }


    //cambiar la contrasenia del user

    public cambioPassword(usuario:user | null, nuevaPassword:string):Observable<user> {
      const generarNuevoUser = {
        usuarios: usuario,
        nuevaPassword: nuevaPassword
      }
      return this.http.put<user>(this.URL+"cambioPassword",generarNuevoUser);
    }


}
