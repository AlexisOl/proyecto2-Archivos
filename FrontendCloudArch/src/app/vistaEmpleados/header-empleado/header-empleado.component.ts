import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SesionServiceService } from 'src/app/services/sesion-service.service';

@Component({
  selector: 'app-header-empleado',
  templateUrl: './header-empleado.component.html',
  styleUrls: ['./header-empleado.component.css']
})
export class HeaderEmpleadoComponent implements OnInit{
  nombreUsuario:any;

  constructor(private sesion: SesionServiceService,
              private router: Router){}


  inicio(){
    this.router.navigate(['./generalEmpleado'])

  }
  cerrarSesion(){
    this.sesion.eliminarUsuario();
    this.router.navigate(['./inicio'])
  }
  ngOnInit() {
    this.nombreUsuario = this.sesion.getUsuario()?.nombre;
    }
}
