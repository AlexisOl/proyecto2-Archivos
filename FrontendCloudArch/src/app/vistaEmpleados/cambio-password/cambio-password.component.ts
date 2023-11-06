import { Component, OnInit } from '@angular/core';
import { EmpleadosServicioService } from 'src/app/services/empleados-servicio.service';
import { SesionServiceService } from 'src/app/services/sesion-service.service';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.css']
})
export class CambioPasswordComponent implements OnInit{
  nombre:any;
  password:any;
  otraVezPassword:any


  constructor(private sesion:SesionServiceService,
    private empleadoServicio: EmpleadosServicioService) {}
  //funcion para cambiar la constrasenia
  cambioPassword(){
    this.empleadoServicio.cambioPassword(this.sesion.getUsuario(), this.password).subscribe();
  }
  ngOnInit() {
      this.nombre = this.sesion.getUsuario()?.nombre;
  }

}
