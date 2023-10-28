import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { archivos } from 'src/app/models/archivos';
import { EmpleadosServicioService } from 'src/app/services/empleados-servicio.service';




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


foods: any[] = [
  '.txt', '.html'
];
constructor(private referencia: MatDialogRef<CreacionArchivoComponent>,
            private empleadoServicio: EmpleadosServicioService){}

cerrar() {
  this.referencia.close();
}

enviarInfo(){
   const nuevoArchivo: archivos = new archivos();
  nuevoArchivo.nombre = this.nombre;
  nuevoArchivo.contenido = this.content;
  nuevoArchivo.extension = this.selectedValue;

  this.empleadoServicio.ingresoArchivo(nuevoArchivo).subscribe(
    (archivo:archivos) => {
      console.log('ingreso', archivo);
    }
  );

}
}
