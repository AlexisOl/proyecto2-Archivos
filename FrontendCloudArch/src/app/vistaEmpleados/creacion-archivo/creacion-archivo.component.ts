import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-creacion-archivo',
  templateUrl: './creacion-archivo.component.html',
  styleUrls: ['./creacion-archivo.component.css']
})


export class CreacionArchivoComponent {
ingresoModal: any;
content: any;
selectedValue: string | undefined;


foods: any[] = [
  '.txt', '.html'
];
constructor(private referencia: MatDialogRef<CreacionArchivoComponent>){}

cerrar() {
  this.referencia.close();
}
}
