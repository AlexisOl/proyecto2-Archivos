import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { archivos } from 'src/app/models/archivos';
import { EmpleadosServicioService } from 'src/app/services/empleados-servicio.service';
import { SesionServiceService } from 'src/app/services/sesion-service.service';
import { UbicacionServicioService } from 'src/app/services/ubicacion-servicio.service';




@Component({
  selector: 'app-creacion-archivo',
  templateUrl: './creacion-archivo.component.html',
  styleUrls: ['./creacion-archivo.component.css']
})


export class CreacionArchivoComponent {
ingresoModal: any;
content: string="";
selectedValue: string="";
nombre:any


extensiones: any[] = [
  '.txt', '.html'
];
constructor(private referencia: MatDialogRef<CreacionArchivoComponent>,
            private empleadoServicio: EmpleadosServicioService,
            private ubicacion: UbicacionServicioService,
            private sesion: SesionServiceService){}

cerrar() {
  this.referencia.close();
}

enviarInfo(){
   const nuevoArchivo: archivos = new archivos();
  nuevoArchivo.nombre = this.nombre;
  nuevoArchivo.contenido = this.content;
  nuevoArchivo.extension = this.selectedValue;
  nuevoArchivo.ubicacion = this.ubicacion.getRutaTexto()
  nuevoArchivo.usuario = this.sesion.getUsuario()?.nombre

  this.empleadoServicio.ingresoArchivo(nuevoArchivo).subscribe(
    (archivo:archivos) => {
      console.log('ingreso', archivo);
    }
  );

}
}
