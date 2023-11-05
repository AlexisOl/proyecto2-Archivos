import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { archivos } from 'src/app/models/archivos';
import { EmpleadosServicioService } from 'src/app/services/empleados-servicio.service';
import { SesionServiceService } from 'src/app/services/sesion-service.service';
import { UbicacionCompartidaService } from 'src/app/services/ubicacion-compartida.service';
import { CompartirArchivoComponent } from '../compartir-archivo/compartir-archivo.component';
import { VerArchivosCompartidosComponent } from '../ver-archivos-compartidos/ver-archivos-compartidos.component';

@Component({
  selector: 'app-archivos-compartidos',
  templateUrl: './archivos-compartidos.component.html',
  styleUrls: ['./archivos-compartidos.component.css']
})
export class ArchivosCompartidosComponent implements OnInit{
  directorioActual: any;
  nombreDirectorio:string=""

  archivosObtenidos:any;
  todxsUser = [];


  constructor(private ubicacionCompartido: UbicacionCompartidaService,
              private empleadosServicio: EmpleadosServicioService,
              private sesion: SesionServiceService,
              public dialog: MatDialog){}

  recargosGenerales() {
    this.recargoArchiovs();
  }

  recargoArchiovs() {
    this.empleadosServicio.verCompartirGeneral(this.directorioActual,this.sesion.getUsuario()?.nombre).subscribe(
      (archivosCompartidos) => {
        this.archivosObtenidos = archivosCompartidos;
      }
    );
  }

  // FUNCION DE VISTA DE ARCHIVOS

  verArchivosIndividualesModal(archivo:archivos) {
      this.dialog.open(VerArchivosCompartidosComponent, {
        width:"70%",
        height:"650px",
        data: {archivos:archivo}
      })
    }

  // FUNCION PARA AGREGAR CARPETAS AL MOVIMIENTO Y MOSTRAR
  // CARPETAS Y ARCHIVOS
  agregarCarpeta(nuevaCarpeta: any) {
    console.log(nuevaCarpeta.ubicacion);

    let textoFinalCarpetas = "";

    this.ubicacionCompartido.setRuta(nuevaCarpeta.nombre);


    this.ubicacionCompartido.getRuta().forEach((valor:any)=> {
      textoFinalCarpetas+=valor+"/";
      console.log(valor);
    });

    this.directorioActual = textoFinalCarpetas;
    console.log("aa"+this.directorioActual);
    this.recargosGenerales();
  }

  // funcion para eliminar archivos
  eliminarArchivoCompartido(archivo:string) {
    this.empleadosServicio.eliminarArchivoCompartido(this.sesion.getUsuario()?.nombre,archivo ).subscribe(

    );
  }


  ngOnInit() {
    // ver ruta de usaurio
        // ver ruta de usaurio

        const ruta = this.ubicacionCompartido.getRuta();
        this.nombreDirectorio = ruta+"/";
        console.log(this.nombreDirectorio);

        this.directorioActual = this.nombreDirectorio;

     this.recargosGenerales();
  }
}
