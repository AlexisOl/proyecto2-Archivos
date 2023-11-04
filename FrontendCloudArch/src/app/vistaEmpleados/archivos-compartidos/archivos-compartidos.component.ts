import { Component, OnInit } from '@angular/core';
import { EmpleadosServicioService } from 'src/app/services/empleados-servicio.service';
import { UbicacionCompartidaService } from 'src/app/services/ubicacion-compartida.service';

@Component({
  selector: 'app-archivos-compartidos',
  templateUrl: './archivos-compartidos.component.html',
  styleUrls: ['./archivos-compartidos.component.css']
})
export class ArchivosCompartidosComponent implements OnInit{
  directorioActual: any;
  nombreDirectorio:string=""

  archivosEliminado:any;
  carpetasEliminado:any;
  todxsUser = [];


  constructor(private ubicacionCompartido: UbicacionCompartidaService,
              private empleadosServicio: EmpleadosServicioService){}

  recargosGenerales() {
    this.recargoArchiovs();
    this.recargoCarpetas();
  }

  recargoArchiovs() {

  }

  recargoCarpetas() {

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
      this.ubicacionCompartido.eliminarParteRuta();
      //recargo de elementos
      this.recargosGenerales();
    }

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
