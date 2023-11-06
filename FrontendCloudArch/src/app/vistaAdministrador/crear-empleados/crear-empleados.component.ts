import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';
import { AdminServicioService } from 'src/app/services/admin-servicio.service';

@Component({
  selector: 'app-crear-empleados',
  templateUrl: './crear-empleados.component.html',
  styleUrls: ['./crear-empleados.component.css']
})
export class CrearEmpleadosComponent implements OnInit{
  nombre:any;
  password:any;
  rol:any;


  constructor(private adminServicio:AdminServicioService) {}

  //funcion para poder crear nuevos empleados

  crearEmpleado(){
    const nuevoEmpleado = new user();

    nuevoEmpleado.nombre = this.nombre;
    nuevoEmpleado.password = this.password;
    nuevoEmpleado.rol = this.rol;
    this.adminServicio.crearNuevoUser(nuevoEmpleado).subscribe();
  }

  ngOnInit() {  }
}
