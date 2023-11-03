import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreacionArchivoComponent } from '../creacion-archivo/creacion-archivo.component';
import { SesionServiceService } from 'src/app/services/sesion-service.service';
import { EmpleadosServicioService } from 'src/app/services/empleados-servicio.service';
import { archivos } from 'src/app/models/archivos';
import { CreacionCarpetaComponent } from '../creacion-carpeta/creacion-carpeta.component';
import { UbicacionServicioService } from 'src/app/services/ubicacion-servicio.service';
import { range } from 'rxjs';
import { VistaEspecificaArchivosComponent } from '../vista-especifica-archivos/vista-especifica-archivos.component';
import { carpetas } from 'src/app/models/carpetas';
import { DeterminacionUbicacionComponent } from '../determinacion-ubicacion/determinacion-ubicacion.component';

@Component({
  selector: 'app-general-empleado',
  templateUrl: './general-empleado.component.html',
  styleUrls: ['./general-empleado.component.css']
})
export class GeneralEmpleadoComponent implements OnInit {

  ingresoModal:boolean=false;
  nombreUsuario:any

  //elementos de archiovs y carpetas
  arhivos: any;
  carpetas:any;

  content = " "
  directorioActual:any
  nombreDirectorio:string=""
  //carpetas
  rutaActual: string[] = [];

  constructor(public dialog: MatDialog, private sesion: SesionServiceService,
              private empleadosService: EmpleadosServicioService,
              private  carpetasServicio: UbicacionServicioService) {}

    //CREACION--------------------------------
  //modal para los archivos
  openDialog() {
    this.dialog.open(CreacionArchivoComponent, {
      width:'80%',
      height:"650px"
    });
  }
  // modal para las carpetas

  crearCarpetaModal() {
    this.dialog.open(CreacionCarpetaComponent, {
      width:'80%',
      height:"350px"
    });
  }


  //modal para actualizaciones de archivos

  actualizarArchivoModal(archivo: archivos){

    this.dialog.open(VistaEspecificaArchivosComponent, {
      width:'80%',
      height:"650px",
      data: {archivos:archivo}
    });
  }

  //modal para determinar que ubicacion quiere mover el archivo
  moverArchivosModal(archivo: archivos) {
    this.dialog.open(DeterminacionUbicacionComponent, {
      width:"70&",
      height:"650px",
      data: {archivos:archivo}
    })
  }

  // funcion para la busqueda de elementos
  buscarArchivos(texto: string) {
    this.empleadosService.buscarElemento(texto).subscribe((archivos) => {
      // Lógica para manejar los archivos recuperados
    });
  }
  //--------------------------------------------
  //--------------------------------------------
  //--------------------------------------------
  //--------------------------------------------
  //funcion  de recargo de archivos
  // FUTURO AGREGAR CARPETAS

  recargosGenerales(){
    this.recargoArchiovs();
    this.recargoCarpetas();
  }

  recargoArchiovs(){

    this.empleadosService.obtenerArchivosDirectorio(this.directorioActual, this.nombreUsuario).subscribe(
      (archivosNuevos) => {
        this.arhivos = archivosNuevos;
      }
    );
  }

  recargoCarpetas(){
    this.empleadosService.obtenerCarpetasConDirectorio(this.directorioActual, this.nombreUsuario).subscribe(
      (carpetasActualizadas) => {
        this.carpetas = carpetasActualizadas;
      }
    )
  }


  // FUNCION DE REGRESO CON CARPETAS Y ARCHIVOS

  retrocesoCarpetas(){
    let nuevoDirectorio ="";
    let valoresAlmacenados = this.directorioActual.split('/');
    console.log(valoresAlmacenados);
    if(valoresAlmacenados.length > 2) {
      for (let i=0; i< valoresAlmacenados.length -2;i++) {
        console.log("a"+valoresAlmacenados[i]);

        nuevoDirectorio+=valoresAlmacenados[i]+"/";
      }
      console.log(nuevoDirectorio);

      this.directorioActual = nuevoDirectorio;
      this.carpetasServicio.eliminarParteRuta();
      //recargo de elementos
      this.recargosGenerales();
    }

  }



  // FUNCION PARA AGREGAR CARPETAS AL MOVIMIENTO Y MOSTRAR
  // CARPETAS Y ARCHIVOS
  agregarCarpeta(nuevaCarpeta: any) {
    console.log(nuevaCarpeta.ubicacion);

    let textoFinalCarpetas = "";

    this.carpetasServicio.setRuta(nuevaCarpeta.nombre);


    this.carpetasServicio.getRuta().forEach((valor:any)=> {
      textoFinalCarpetas+=valor+"/";
      console.log(valor);
    });

    this.directorioActual = textoFinalCarpetas;
    console.log("aa"+this.directorioActual);
    this.recargosGenerales();
  }

  //--------------------------------------------
  //--------------------------------------------
  //--------------------------------------------
  //--------------------------------------------
  //funcion para copiar archivo
  copiarArchivo(archivo:archivos){
    this.empleadosService.copiarArchivo(archivo,this.directorioActual).subscribe(
      (copiado:any) => {
        console.log(copiado);
      }
    )
  }
//funcion para copiar carpeta
  copiarCarpeta(carpeta: carpetas) {
    this.empleadosService.copiarDirectorio(carpeta, this.directorioActual).subscribe(
      (copiado:any) => {
        console.log(copiado);
      }

    )
  }


  //funcion para elminar archivo

  eliminarArchivo(archivo:archivos) {
    this.empleadosService.eliminarArchivo(archivo).subscribe(
      (eliminado:any) =>{
        console.log(eliminado);
      }
    )
  }

  //funcion para eliminar carpetas
  eliminarCarpetas(carpeta:carpetas) {
    this.empleadosService.eliminarCarpetas(carpeta).subscribe(
      (eliminado: any) => {
        console.log(eliminado);

      }
    )
  }
  //--------------------------------------------
  //--------------------------------------------
  //--------------------------------------------
  //--------------------------------------------
  //funcion para ver el modal

  abrirModal(){
    this.ingresoModal = !this.ingresoModal;
  }


  //boton para cada card
  verElemento(elemento:any){
console.log(elemento);

  }



  //--------------------------------------------
  //--------------------------------------------
  //--------------------------------------------
  //--------------------------------------------
  //init con todos los valores

  ngOnInit()  {
    // ver nombre de usuario
    this.nombreUsuario = this.sesion.getUsuario()?.nombre;


    // ver ruta de usaurio
    const ruta = this.carpetasServicio.getRuta();
    this.nombreDirectorio = ruta+"/";
    console.log(this.nombreDirectorio);

    this.directorioActual = this.nombreDirectorio;

    this.recargosGenerales();

    console.log(this.directorioActual);
  }


}
