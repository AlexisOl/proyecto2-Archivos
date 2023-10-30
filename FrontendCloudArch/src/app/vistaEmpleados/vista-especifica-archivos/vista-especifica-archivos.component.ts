import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { archivos } from 'src/app/models/archivos';
import { EmpleadosServicioService } from 'src/app/services/empleados-servicio.service';

@Component({
  selector: 'app-vista-especifica-archivos',
  templateUrl: './vista-especifica-archivos.component.html',
  styleUrls: ['./vista-especifica-archivos.component.css']
})
export class VistaEspecificaArchivosComponent implements OnInit {
  ingresoModal: any;
  content: string="";
  selectedValue: string="";
  nombre:any

  extensiones: any[] = [
    '.txt', '.html'
  ];

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
            private referencia: MatDialogRef<VistaEspecificaArchivosComponent>,
            private empleadoServicio: EmpleadosServicioService){
             }


  //funcion para editar

  editarArchivo(){
    const archivoEditado: archivos = new archivos();

    archivoEditado.nombre = this.nombre;
    archivoEditado.extension = this.selectedValue;
    archivoEditado.contenido = this.content;


    this.empleadoServicio.editarArchivos(archivoEditado, this.data.archivos._id).subscribe(
      (editado: archivos) => {
        console.log(editado);
      }
    )
  }



  //funcion para cerrar el modal
  cerrar() {
    this.referencia.close();
  }


  ngOnInit() {
    this.nombre = this.data.archivos.nombre;
    this.selectedValue = this.data.archivos.extension;
    this.content = this.data.archivos.contenido;
  }
}
