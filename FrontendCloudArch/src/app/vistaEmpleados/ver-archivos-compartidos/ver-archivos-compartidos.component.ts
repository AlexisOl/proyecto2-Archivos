import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-archivos-compartidos',
  templateUrl: './ver-archivos-compartidos.component.html',
  styleUrls: ['./ver-archivos-compartidos.component.css']
})
export class VerArchivosCompartidosComponent implements OnInit {
  nombre:any;
  extension:any;
  contenido:any;
  usuarioOriginal:any;
  fecha:any
  hora:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private referencia: MatDialogRef<VerArchivosCompartidosComponent>,){}
 //funcion para cerrar el modal
 cerrar() {
  this.referencia.close();
}



ngOnInit() {
  console.log(this.data);

    this.nombre = this.data.archivos.nombre;
    this.contenido = this.data.archivos.contenido;
    this.extension = this.data.archivos.extension;
    this.usuarioOriginal = this.data.archivos.usuarioOriginal;
    this.fecha = this.data.archivos.fecha;
    this.hora = this.data.archivos.hora;

}
}

