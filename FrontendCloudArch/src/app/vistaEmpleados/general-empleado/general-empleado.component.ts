import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreacionArchivoComponent } from '../creacion-archivo/creacion-archivo.component';
import { SesionServiceService } from 'src/app/services/sesion-service.service';
import { EmpleadosServicioService } from 'src/app/services/empleados-servicio.service';
import { archivos } from 'src/app/models/archivos';

@Component({
  selector: 'app-general-empleado',
  templateUrl: './general-empleado.component.html',
  styleUrls: ['./general-empleado.component.css']
})
export class GeneralEmpleadoComponent implements OnInit {

  ingresoModal:boolean=false;
  nombreUsuario:any
  arhivos: any;
  content = " "

  constructor(public dialog: MatDialog, private sesion: SesionServiceService,
              private empleadosService: EmpleadosServicioService ) {}


  openDialog() {
    this.dialog.open(CreacionArchivoComponent, {
      width:'80%',
      height:"650px"
    });



  }

  abrirModal(){
    this.ingresoModal = !this.ingresoModal;
  }


  ngOnInit()  {
      this.nombreUsuario = this.sesion.getUsuario()?.nombre;
      this.empleadosService.obtenerArchivos().subscribe(
        (elemento) => {
          this.arhivos = elemento;
        }
      );




  }
}
