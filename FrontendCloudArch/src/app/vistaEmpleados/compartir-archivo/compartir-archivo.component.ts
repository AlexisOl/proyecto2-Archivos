import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpleadosServicioService } from 'src/app/services/empleados-servicio.service';
import { DeterminacionUbicacionComponent } from '../determinacion-ubicacion/determinacion-ubicacion.component';

@Component({
  selector: 'app-compartir-archivo',
  templateUrl: './compartir-archivo.component.html',
  styleUrls: ['./compartir-archivo.component.css']
})
export class CompartirArchivoComponent implements OnInit {
  nombre:any
  constructor(  @Inject(MAT_DIALOG_DATA) public data: any,
  private referencia: MatDialogRef<CompartirArchivoComponent>,
    private elementosSugeridos: EmpleadosServicioService){}
 //cerra la referencia
 cerrar() {
  this.referencia.close();
  }
  compartirArchivo() {
    this.elementosSugeridos.compartirArchivo(this.nombre, this.data.archivos).subscribe( );
  }

  ngOnInit() {

  }

}
