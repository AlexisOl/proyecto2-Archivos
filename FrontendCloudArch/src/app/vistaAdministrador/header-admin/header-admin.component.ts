import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SesionServiceService } from 'src/app/services/sesion-service.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {
  nombreUsuario:any;

  constructor(private sesion: SesionServiceService,
              private router: Router){}


  inicio(){
    this.router.navigate(['./generalAdmin'])

  }

  irCrearEmpleado(){
    this.router.navigate(['./generalAdmin/crearEmpleados'])
  }
  irPapelera() {
    this.router.navigate(['./generalAdmin/papelera'])
  }
  funcionEmpleado(){
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
