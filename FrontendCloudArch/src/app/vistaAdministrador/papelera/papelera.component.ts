import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { archivos } from 'src/app/models/archivos';
import { AdminServicioService } from 'src/app/services/admin-servicio.service';
import { UbicacionPapeleraService } from 'src/app/services/ubicacion-papelera.service';
import { VerArchivosCompartidosComponent } from 'src/app/vistaEmpleados/ver-archivos-compartidos/ver-archivos-compartidos.component';

@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css'],
})
export class PapeleraComponent implements OnInit {
  directorioActual: any;
  nombreDirectorio:string=""

  archivosEliminado:any;
  carpetasEliminado:any;
  todxsUser = [];

  constructor(private adminServicio: AdminServicioService,
              private ubicacionPapelera: UbicacionPapeleraService,
              public dialog: MatDialog) {}

  //modales
  verArchivosIndividualesModal(archivo:archivos) {
    this.dialog.open(VerArchivosCompartidosComponent, {
      width:"70%",
      height:"650px",
      data: {archivos:archivo}
    })
  }
  // para mover

  recargosGenerales() {
    this.recargoArchiovs();
    this.recargoCarpetas();
  }

  recargoArchiovs() {
    this.adminServicio
      .verPapeleraGeneral(this.directorioActual)
      .subscribe((archivosEliminados) => {
        this.archivosEliminado = archivosEliminados;
      });
  }

  recargoCarpetas() {
    this.adminServicio
      .verPapeleraCarpetasGeneral(this.directorioActual)
      .subscribe((carpetasEliminados) => {
        this.carpetasEliminado = carpetasEliminados;
      });
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
      this.ubicacionPapelera.eliminarParteRuta();
      //recargo de elementos
      this.recargosGenerales();
    }

  }



  // FUNCION PARA AGREGAR CARPETAS AL MOVIMIENTO Y MOSTRAR
  // CARPETAS Y ARCHIVOS
  agregarCarpeta(nuevaCarpeta: any) {
    console.log(nuevaCarpeta.ubicacion);

    let textoFinalCarpetas = "";

    this.ubicacionPapelera.setRuta(nuevaCarpeta.nombre);


    this.ubicacionPapelera.getRuta().forEach((valor:any)=> {
      textoFinalCarpetas+=valor+"/";
      console.log(valor);
    });

    this.directorioActual = textoFinalCarpetas;
    console.log("aa"+this.directorioActual);
    this.recargosGenerales();
  }


  ngOnInit() {
       // ver ruta de usaurio
        // ver ruta de usaurio

       const ruta = this.ubicacionPapelera.getRuta();
       this.nombreDirectorio = ruta+"/";
       console.log(this.nombreDirectorio);

       this.directorioActual = this.nombreDirectorio;

    this.recargosGenerales();
  }
}
