import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { carpetas } from 'src/app/models/carpetas';
import { EmpleadosServicioService } from 'src/app/services/empleados-servicio.service';
import { SesionServiceService } from 'src/app/services/sesion-service.service';
import { UbicacionServicioService } from 'src/app/services/ubicacion-servicio.service';

@Component({
  selector: 'app-creacion-carpeta',
  templateUrl: './creacion-carpeta.component.html',
  styleUrls: ['./creacion-carpeta.component.css']
})
export class CreacionCarpetaComponent implements OnInit {

  nombre:any;

  constructor(private referencia: MatDialogRef<CreacionCarpetaComponent>,
    private empleadoServicio: EmpleadosServicioService,
    private ubicacion: UbicacionServicioService,
    private usuario: SesionServiceService){}


    //cerra la referencia
    cerrar() {
      this.referencia.close();
    }





  //funcio para enviar la info
  enviarInfo(){
      const nuevoCarpeta: carpetas = new carpetas();
      nuevoCarpeta.nombre = this.nombre;
      nuevoCarpeta.ubicacion = this.ubicacion.getRutaTexto()
      nuevoCarpeta.tipo = 'raiz'
      nuevoCarpeta.usuario = this.usuario.getUsuario()?.nombre
      nuevoCarpeta.archivos = []

      this.empleadoServicio.ingresoCarpetas(nuevoCarpeta).subscribe(
        (carpetas:carpetas) => {
          console.log('ingresoCarpeta', carpetas);

        }
      )
   }




  ngOnInit(): void { }
}
