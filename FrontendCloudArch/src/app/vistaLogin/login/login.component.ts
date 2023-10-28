import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { LoginservicioService } from 'src/app/services/loginservicio.service';
import { SesionServiceService } from 'src/app/services/sesion-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  constructor(private loginServicio:LoginservicioService,
              private sesionServicio: SesionServiceService,
              private route:Router) {}

  //variables
  nombre:any;
  password:any;
  processingRequest:boolean = false


  ingresoUsuario() {
    this.loginServicio.getUsuario(this.nombre, this.password).subscribe(
      (usuarios: user) => {
        console.log('Respuesta del servidor:', usuarios);
      }
    );
  }




  public generacionLogin() {
    //intento de ingreso
    this.processingRequest = true;
    //gheneracion del servicio

    this.loginServicio.getUsuario(this.nombre, this.password).subscribe(
      (user: user) => {
        console.log("a",user);

        if (user && user.nombre && user.password) {
          if (
            user.nombre === this.nombre &&
            user.password === this.password
          ) {
            // El usuario se encontró, puedes realizar acciones adicionales aquí
            console.log('Ingreso exitoso');
            // redirrecion y fin de proceso
            this.processingRequest = false;
            this.sesionServicio.setUsuario(user);
            console.log(user);

            this.redireccionUsuarios(user);
          } else{
          console.log('No se pudo ingresar Correctamente', 'error');

          }
        } else {
          console.log('No se pudo ingresar Correctamente', 'error');
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // generacion del tipo de ususario
  public redireccionUsuarios(usuarios: user) {
    switch (usuarios.rol) {
      case 1:
        //this.sesionActiva.setUsuario(usuarios)
        this.route.navigate(['/generalEmpleado']);

        break;
      case 2:
        //   this.sesionActiva.setUsuario(usuarios)
        this.route.navigate(['/generalAdmin']);
        break;
    }
  }


  ngOnInit(): void {

  }
}
