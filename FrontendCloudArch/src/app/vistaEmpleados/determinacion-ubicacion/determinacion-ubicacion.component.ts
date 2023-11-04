import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { archivos } from 'src/app/models/archivos';
import { EmpleadosServicioService } from 'src/app/services/empleados-servicio.service';

@Component({
  selector: 'app-determinacion-ubicacion',
  templateUrl: './determinacion-ubicacion.component.html',
  styleUrls: ['./determinacion-ubicacion.component.css']
})

export class DeterminacionUbicacionComponent implements OnInit{
  states:any=[];
  verDirectorios: any;
  displayedColumns: string[] = ['position', 'name'];
  nombre:any;
  verTabla:boolean = false;
  selectedValue: any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
              private referencia: MatDialogRef<DeterminacionUbicacionComponent>,
              private elementosSugeridos: EmpleadosServicioService){}

  //funcion de buscar en base a lo que ponga
  buscar(){
    this.verTabla = !this.verTabla;
    this.states = []
    this.verDirectorios=[]
    this.elementosSugeridos.obtenerElementosRelacionadosCarpetas(this.nombre).subscribe(
      (elementos:any)=> {
        // Acceder a cada valor individual
        elementos.arrayValores.forEach((nuevo:any,  index: number) => {
          this.states.push(nuevo);
          this.verDirectorios.push({position: index + 1, Nombre:nuevo});
        });
      this.verTabla = true;
      }
    )
    this.nombre = "";
    console.log(this.verDirectorios);


  }
 //mandar info
  mandarInfo(){

    if (this.data.tipo==="archivo") {
      this.elementosSugeridos.moverArchivo(this.selectedValue, this.data.archivos).subscribe(
        (elemento) => {
          console.log(elemento);
        }
      );
    } else {
      this.elementosSugeridos.moverCarpetas(this.selectedValue, this.data.carpetas).subscribe(
        (elemento) => {
          console.log(elemento);
        }
      )

    }


  }
 //cerra la referencia
  cerrar() {
  this.referencia.close();
  }


  ngOnInit() {

  }

}
