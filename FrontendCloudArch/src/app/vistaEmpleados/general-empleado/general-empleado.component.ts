import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreacionArchivoComponent } from '../creacion-archivo/creacion-archivo.component';

@Component({
  selector: 'app-general-empleado',
  templateUrl: './general-empleado.component.html',
  styleUrls: ['./general-empleado.component.css']
})
export class GeneralEmpleadoComponent {

  ingresoModal:boolean=false;

  constructor(public dialog: MatDialog) {}

  content = " "

  openDialog() {
    this.dialog.open(CreacionArchivoComponent, {
      width:'80%',
      height:"650px"
    });



  }

  abrirModal(){
    this.ingresoModal = !this.ingresoModal;
  }
}
