import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';
import { LoginservicioService } from 'src/app/services/loginservicio.service';
import { SesionServiceService } from 'src/app/services/sesion-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  constructor(private loginServicio:LoginservicioService, private sesionServicio: SesionServiceService) {}
  nombre:any;
  password:any;


  ingresoUsuario() {
    this.loginServicio.getUsuario(this.nombre, this.password).subscribe(
      (usuarios: user) => {
        console.log('Respuesta del servidor:', usuarios);
      }
    );
  }


  ngOnInit(): void {

  }
}
